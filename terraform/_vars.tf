variable "region" {
  description = "Azure region to create infrastructure in"
  default     = "eastus"
}
variable "base_url" {
  description = "The base url for the site"
  default     = "exposureessence.com"
}
variable "project" {
  description = "The project name"
  default     = "exess"
}
variable "environment" {
  description = "The project environment"
  default     = "prod"
}
variable "tags_extra" {
  type        = map(string)
  description = "Extra tags that should be applied to all resources"
  default     = {}
}
