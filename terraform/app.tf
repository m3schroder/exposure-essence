resource "azurerm_linux_web_app" "app" {
  name                = local.environmentvars["image"]
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  service_plan_id     = azurerm_service_plan.svc-plan.id
  app_settings = {
    WEBSITES_PORT    = local.environmentvars["port"]
    DOCKER_ENABLE_CI = true
  }

  site_config {
    container_registry_use_managed_identity = true
    always_on                               = true
    application_stack {
      docker_image_name   = "${local.environmentvars["image"]}:${local.environmentvars["image_tag"]}"
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
      file_system_level = "Warning"
      #  azure_blob_storage {
      #    sas_url           = data.azurerm_storage_account_blob_container_sas.blob.sas
      #    retention_in_days = 5
      #    level             = "Warning"
      #  }
    }
  }
  identity {
    type = "SystemAssigned"
  }
}
resource "azurerm_container_registry_webhook" "webhook" {
  name                = "${var.project}webhook"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  registry_name       = azurerm_container_registry.registry.name
  service_uri         = "https://${azurerm_linux_web_app.app.site_credential[0].name}:${azurerm_linux_web_app.app.site_credential[0].password}@${azurerm_linux_web_app.app.name}.scm.azurewebsites.net/docker/hook"
  status              = "enabled"
  scope               = "${local.environmentvars["image"]}:latest"
  actions             = ["push"]
  custom_headers      = { "Content-Type" = "application/json" }
}
resource "azurerm_role_assignment" "acr_pull" {
  principal_id         = azurerm_linux_web_app.app.identity[0].principal_id
  role_definition_name = "AcrPull"
  scope                = azurerm_container_registry.registry.id
}
