locals {
  tags_common = merge(var.tags_extra, {
    Project     = var.project
    Environment = var.environment
    ManagedBy   = "terraform"
  })
  name_prefix = "${var.project}-${var.environment}"
  env = {
    default = {
      location  = "eastus"
      image     = "${local.name_prefix}-landing"
      api_image = "${local.name_prefix}-api"
      image_tag = "latest"
      port      = 3000
      api_port  = 8080
      domain    = "${var.environment}.${var.base_url}"
    }
    dev = {
    }
    qa = {
    }
    prod = {
      domain = var.base_url
    }
  }
  workspace       = contains(keys(local.env), var.environment) ? var.environment : "default"
  environmentvars = merge(local.env["default"], local.env[local.workspace])
}
