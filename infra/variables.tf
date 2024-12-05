
variable "project_id" {
  type        = string
  description = "Project ID where the api will be deployed"
}

variable "region" {
  type        = string
  default     = "us-central1"
  description = "Region where deploy resources and services"
}

variable "tf_bucket" {
  type        = string
  description = "bucket to store the tfstate file"
}