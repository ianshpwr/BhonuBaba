variable "aws_region" {
  description = "AWS region for the deployment."
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name used for resource naming."
  type        = string
  default     = "bhonubaba"
}

variable "container_port" {
  description = "Port exposed by the backend container."
  type        = number
  default     = 5000
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC."
  type        = string
  default     = "10.42.0.0/16"
}

variable "tags" {
  description = "Common resource tags."
  type        = map(string)
  default = {
    ManagedBy = "Terraform"
    Project   = "BhonuBaba"
  }
}
