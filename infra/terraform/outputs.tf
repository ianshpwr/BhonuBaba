output "application_bucket_name" {
  value = aws_s3_bucket.artifacts.bucket
}

output "ecr_repository_name" {
  value = aws_ecr_repository.server.name
}

output "ecr_repository_url" {
  value = aws_ecr_repository.server.repository_url
}

output "ecs_cluster_name" {
  value = aws_ecs_cluster.main.name
}

output "ecs_service_name" {
  value = "${lower(var.project_name)}-service"
}

output "task_family" {
  value = "${lower(var.project_name)}-task"
}

output "task_execution_role_arn" {
  value = aws_iam_role.execution.arn
}

output "task_role_arn" {
  value = aws_iam_role.task.arn
}

output "cloudwatch_log_group_name" {
  value = aws_cloudwatch_log_group.app.name
}

output "target_group_arn" {
  value = aws_lb_target_group.app.arn
}

output "public_subnet_ids_json" {
  value = jsonencode(values(aws_subnet.public)[*].id)
}

output "service_security_group_id" {
  value = aws_security_group.service.id
}

output "load_balancer_dns_name" {
  value = aws_lb.app.dns_name
}

output "container_port" {
  value = tostring(var.container_port)
}
