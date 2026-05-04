data "aws_caller_identity" "current" {}

data "aws_availability_zones" "available" {
  state = "available"
}

resource "random_string" "bucket_suffix" {
  length  = 6
  upper   = false
  special = false
}

locals {
  name_prefix              = lower(var.project_name)
  application_bucket_name  = "${local.name_prefix}-${data.aws_caller_identity.current.account_id}-${random_string.bucket_suffix.result}"
  ecs_cluster_name         = "${local.name_prefix}-cluster"
  ecs_service_name         = "${local.name_prefix}-service"
  task_family              = "${local.name_prefix}-task"
  log_group_name           = "/ecs/${local.name_prefix}"
  ecr_repository_name      = "${local.name_prefix}-server"
  mongo_ssm_parameter_name = "/${local.name_prefix}/production/mongo-uri"
  jwt_ssm_parameter_name   = "/${local.name_prefix}/production/jwt-secret"
  availability_zones       = slice(data.aws_availability_zones.available.names, 0, 2)
  common_tags              = merge(var.tags, { Environment = "production" })
}

resource "aws_s3_bucket" "artifacts" {
  bucket = local.application_bucket_name
  tags   = local.common_tags
}

resource "aws_s3_bucket_versioning" "artifacts" {
  bucket = aws_s3_bucket.artifacts.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "artifacts" {
  bucket = aws_s3_bucket.artifacts.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "artifacts" {
  bucket = aws_s3_bucket.artifacts.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true
  tags                 = merge(local.common_tags, { Name = "${local.name_prefix}-vpc" })
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  tags   = merge(local.common_tags, { Name = "${local.name_prefix}-igw" })
}

resource "aws_subnet" "public" {
  for_each = tomap({
    for index, az in local.availability_zones : az => {
      cidr_block = cidrsubnet(var.vpc_cidr, 8, index)
      az         = az
    }
  })

  vpc_id                  = aws_vpc.main.id
  availability_zone       = each.value.az
  cidr_block              = each.value.cidr_block
  map_public_ip_on_launch = true

  tags = merge(local.common_tags, {
    Name = "${local.name_prefix}-${replace(each.value.az, "-", "")}-public"
  })
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = merge(local.common_tags, { Name = "${local.name_prefix}-public-rt" })
}

resource "aws_route_table_association" "public" {
  for_each = aws_subnet.public

  subnet_id      = each.value.id
  route_table_id = aws_route_table.public.id
}

resource "aws_security_group" "load_balancer" {
  name        = "${local.name_prefix}-alb-sg"
  description = "Allow HTTP traffic to the load balancer."
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = local.common_tags
}

resource "aws_security_group" "service" {
  name        = "${local.name_prefix}-service-sg"
  description = "Allow traffic from the load balancer to ECS tasks."
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port       = var.container_port
    to_port         = var.container_port
    protocol        = "tcp"
    security_groups = [aws_security_group.load_balancer.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = local.common_tags
}

resource "aws_lb" "app" {
  name               = "${local.name_prefix}-alb"
  load_balancer_type = "application"
  security_groups    = [aws_security_group.load_balancer.id]
  subnets            = values(aws_subnet.public)[*].id
  tags               = local.common_tags
}

resource "aws_lb_target_group" "app" {
  name        = "${substr(local.name_prefix, 0, 18)}-tg"
  port        = var.container_port
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = aws_vpc.main.id

  health_check {
    enabled             = true
    healthy_threshold   = 2
    unhealthy_threshold = 2
    interval            = 30
    matcher             = "200"
    path                = "/health"
    timeout             = 5
  }

  tags = local.common_tags
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.app.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app.arn
  }
}

resource "aws_cloudwatch_log_group" "app" {
  name              = local.log_group_name
  retention_in_days = 14
  tags              = local.common_tags
}

resource "aws_ecr_repository" "server" {
  name                 = local.ecr_repository_name
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  encryption_configuration {
    encryption_type = "AES256"
  }

  tags = local.common_tags
}

resource "aws_ecr_lifecycle_policy" "server" {
  repository = aws_ecr_repository.server.name

  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Keep the 10 most recent images"
        selection = {
          tagStatus   = "any"
          countType   = "imageCountMoreThan"
          countNumber = 10
        }
        action = {
          type = "expire"
        }
      }
    ]
  })
}

# Learner Lab does not allow iam:CreateRole or iam:AttachRolePolicy.
# Use the pre-existing LabRole for both the ECS execution and task roles.
data "aws_iam_role" "execution" {
  name = "LabRole"
}

data "aws_iam_role" "task" {
  name = "LabRole"
}

resource "aws_ecs_cluster" "main" {
  name = local.ecs_cluster_name

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  tags = local.common_tags
}
