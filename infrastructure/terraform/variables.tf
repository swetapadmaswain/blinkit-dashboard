variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "kubeconfig_path" {
  description = "Path to kubeconfig file"
  type        = string
  default     = "~/.kube/config"
}

variable "cluster_name" {
  description = "EKS cluster name"
  type        = string
  default     = "discovery-engine-cluster"
}

variable "node_group_name" {
  description = "EKS node group name"
  type        = string
  default     = "discovery-engine-nodes"
}
