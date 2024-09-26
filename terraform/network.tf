# resource "azurerm_dns_zone" "dns" {
#   name                = var.base_url
#   resource_group_name = azurerm_resource_group.rg.name
# }
# resource "azurerm_dns_a_record" "record" {
#   name                = "@"
#   zone_name           = azurerm_dns_zone.dns.name
#   resource_group_name = azurerm_resource_group.rg.name
#   ttl                 = 300
#   records = [element(
#     split(",", "${azurerm_linux_web_app.app.outbound_ip_addresses}"),
#     length(split(",", "${azurerm_linux_web_app.app.outbound_ip_addresses}")) - 1
#   )]
# }
# resource "azurerm_dns_txt_record" "t1" {
#   name                = "asuid"
#   zone_name           = azurerm_dns_zone.dns.name
#   resource_group_name = azurerm_resource_group.rg.name
#   ttl                 = 300
#
#   record {
#     value = azurerm_linux_web_app.app.custom_domain_verification_id
#   }
# }
# resource "azurerm_dns_txt_record" "t2" {
#   name                = "asuid.www"
#   zone_name           = azurerm_dns_zone.dns.name
#   resource_group_name = azurerm_resource_group.rg.name
#   ttl                 = 300
#
#   record {
#     value = azurerm_linux_web_app.app.custom_domain_verification_id
#   }
# }
# resource "azurerm_dns_txt_record" "t3" {
#   name                = "asuid.api"
#   zone_name           = azurerm_dns_zone.dns.name
#   resource_group_name = azurerm_resource_group.rg.name
#   ttl                 = 300
#
#   record {
#     value = azurerm_linux_web_app.api.custom_domain_verification_id
#   }
# }
# resource "azurerm_dns_cname_record" "api" {
#   name                = "api"
#   zone_name           = azurerm_dns_zone.dns.name
#   resource_group_name = azurerm_resource_group.rg.name
#   ttl                 = 300
#   record              = "${local.environmentvars["api_image"]}.azurewebsites.net"
# }
# resource "azurerm_dns_cname_record" "app" {
#   name                = "www"
#   zone_name           = azurerm_dns_zone.dns.name
#   resource_group_name = azurerm_resource_group.rg.name
#   ttl                 = 300
#   record              = "${local.environmentvars["image"]}.azurewebsites.net"
# }
# resource "azurerm_dns_mx_record" "email" {
#   name                = "@"
#   zone_name           = azurerm_dns_zone.dns.name
#   resource_group_name = azurerm_resource_group.rg.name
#   ttl                 = 3600
#
#   record {
#     preference = 15
#     exchange   = "pl4hd3ua5uw2gavbuy5ihgi42ai5odrumttfhvezcjiote24lrqq.mx-verification.google.com"
#   }
#   record {
#     preference = 1
#     exchange   = "smtp.google.com."
#   }
# }
#
#
# # Certificate for app
# resource "azurerm_app_service_custom_hostname_binding" "root" {
#   hostname            = local.environmentvars["domain"]
#   app_service_name    = azurerm_linux_web_app.app.name
#   resource_group_name = azurerm_resource_group.rg.name
#
#   # Ignore ssl_state and thumbprint as they are managed using
#   # azurerm_app_service_certificate_binding.example
#   lifecycle {
#     ignore_changes = [ssl_state, thumbprint]
#   }
# }
# resource "azurerm_app_service_managed_certificate" "root" {
#   custom_hostname_binding_id = azurerm_app_service_custom_hostname_binding.root.id
# }
# resource "azurerm_app_service_certificate_binding" "root" {
#   hostname_binding_id = azurerm_app_service_custom_hostname_binding.root.id
#   certificate_id      = azurerm_app_service_managed_certificate.root.id
#   ssl_state           = "SniEnabled"
# }
#
# # Certificate for app at www
# resource "azurerm_app_service_custom_hostname_binding" "www" {
#   hostname            = "www.${local.environmentvars["domain"]}"
#   app_service_name    = azurerm_linux_web_app.app.name
#   resource_group_name = azurerm_resource_group.rg.name
#   depends_on          = [azurerm_dns_cname_record.app]
#
#   # Ignore ssl_state and thumbprint as they are managed using
#   # azurerm_app_service_certificate_binding.example
#   lifecycle {
#     ignore_changes = [ssl_state, thumbprint]
#   }
# }
# resource "azurerm_app_service_managed_certificate" "www" {
#   custom_hostname_binding_id = azurerm_app_service_custom_hostname_binding.www.id
# }
# resource "azurerm_app_service_certificate_binding" "www" {
#   hostname_binding_id = azurerm_app_service_custom_hostname_binding.www.id
#   certificate_id      = azurerm_app_service_managed_certificate.www.id
#   ssl_state           = "SniEnabled"
# }
