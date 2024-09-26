data "github_repository" "app" {
  full_name = "struktio/exess"
}

resource "random_id" "verification" {
  byte_length = 12
}

resource "github_repository_environment" "prod" {
  repository  = data.github_repository.app.name
  environment = "production"
}
resource "github_actions_variable" "login_server" {
  repository    = data.github_repository.app.name
  variable_name = "login_server"
  value         = azurerm_container_registry.registry.login_server
}
resource "github_actions_variable" "registry_user" {
  repository    = data.github_repository.app.name
  variable_name = "registry_user"
  value         = azurerm_container_registry.registry.admin_username

}
resource "github_actions_secret" "registry_password" {
  repository      = data.github_repository.app.name
  secret_name     = "registry_password"
  plaintext_value = azurerm_container_registry.registry.admin_password
}
resource "github_actions_secret" "verify_key" {
  repository      = data.github_repository.app.name
  secret_name     = "verify_key"
  plaintext_value = random_id.verification.hex
}
resource "github_actions_environment_variable" "url" {
  repository    = data.github_repository.app.name
  environment   = github_repository_environment.prod.environment
  variable_name = "url"
  value         = "https://${local.environmentvars["image"]}.azurewebsites.net"
}
resource "github_actions_environment_variable" "api_url" {
  repository    = data.github_repository.app.name
  environment   = github_repository_environment.prod.environment
  variable_name = "api_url"
  value         = "https://api.${local.environmentvars["domain"]}"
}


resource "github_actions_environment_variable" "theapp_name" {
  repository    = data.github_repository.app.name
  environment   = github_repository_environment.prod.environment
  variable_name = "app_name"
  value         = azurerm_linux_web_app.app.name
}
resource "github_actions_environment_variable" "api_name" {
  repository    = data.github_repository.app.name
  environment   = github_repository_environment.prod.environment
  variable_name = "api_name"
  value         = azurerm_linux_web_app.api.name
}
resource "github_actions_environment_variable" "cors" {
  repository    = data.github_repository.app.name
  environment   = github_repository_environment.prod.environment
  variable_name = "cors"
  value         = "https://${local.environmentvars["image"]}.azurewebsites.net"
}
resource "github_actions_environment_variable" "blob_key" {
  repository    = data.github_repository.app.name
  environment   = github_repository_environment.prod.environment
  variable_name = "blob_key"
  value         = azurerm_storage_account.storage.primary_access_key
}
resource "github_actions_environment_variable" "blob_url" {
  repository    = data.github_repository.app.name
  environment   = github_repository_environment.prod.environment
  variable_name = "blob_url"
  value         = "https://${azurerm_storage_account.storage.name}.blob.core.windows.net/"
}
resource "github_actions_environment_secret" "mssql_conn" {
  repository      = data.github_repository.app.name
  environment     = github_repository_environment.prod.environment
  secret_name     = "mssql_conn"
  plaintext_value = "${azurerm_mssql_server.server.administrator_login}:${random_id.server.hex}St1@${azurerm_mssql_server.server.fully_qualified_domain_name}"
}
