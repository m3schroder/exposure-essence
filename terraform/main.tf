data "azurerm_client_config" "current" {}
terraform {
  cloud {
    organization = "strukt"

    workspaces {
      name = "exess"
    }
  }
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.106.1"
    }
    github = {
      source  = "integrations/github"
      version = "~> 6.0"
    }
  }
}
provider "azurerm" {
  features {
    resource_group {
      prevent_deletion_if_contains_resources = false
    }
  }

}
provider "github" {}

resource "azurerm_resource_group" "rg" {
  name     = "${var.project}-rg"
  location = "eastus"
}
resource "azurerm_container_registry" "registry" {
  name                = "${var.project}io"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
  admin_enabled       = true

  identity {
    type = "SystemAssigned"
  }
}
resource "azurerm_service_plan" "svc-plan" {
  name                = "${var.project}-sp"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  os_type             = "Linux"
  sku_name            = "B1"
}
