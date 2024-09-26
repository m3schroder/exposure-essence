resource "azurerm_linux_web_app" "api" {
  name                = local.environmentvars["api_image"]
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  service_plan_id     = azurerm_service_plan.svc-plan.id
  app_settings = {
    WEBSITES_PORT    = local.environmentvars["api_port"]
    DOCKER_ENABLE_CI = true
  }

  site_config {
    container_registry_use_managed_identity = true
    always_on                               = true
    application_stack {
      docker_image_name   = "${local.environmentvars["api_image"]}:${local.environmentvars["image_tag"]}"
      docker_registry_url = "https://${azurerm_container_registry.registry.login_server}"
    }
  }
  logs {
    http_logs {
      file_system {
        retention_in_days = 3
        retention_in_mb   = 30
      }
    }
    application_logs {
      file_system_level = "Error"
    }
  }
  identity {
    type = "SystemAssigned"
  }
}
resource "azurerm_container_registry_webhook" "apiwebhook" {
  name                = "${var.project}apiwebhook"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  registry_name       = azurerm_container_registry.registry.name
  service_uri         = "https://${azurerm_linux_web_app.api.site_credential[0].name}:${azurerm_linux_web_app.api.site_credential[0].password}@${azurerm_linux_web_app.api.name}.scm.azurewebsites.net/docker/hook"
  status              = "enabled"
  scope               = "${local.environmentvars["api_image"]}:latest"
  actions             = ["push"]
  custom_headers      = { "Content-Type" = "application/json" }
}
resource "azurerm_role_assignment" "api_acr_pull" {
  principal_id         = azurerm_linux_web_app.api.identity[0].principal_id
  role_definition_name = "AcrPull"
  scope                = azurerm_container_registry.registry.id
}
