# Módulos de alto nivel
https://github.com/terraform-google-modules


Ejemplo, un módulo que hace NAT para salir a internet para las VMs sin IP púlica.
https://github.com/terraform-google-modules/terraform-google-cloud-nat

Para crear una instancia:
https://github.com/terraform-google-modules/terraform-google-vm


# Crear una service account para usar con terraform
https://cloud.google.com/community/tutorials/managing-gcp-projects-with-terraform

gcloud iam service-accounts create terraform --display-name "Terraform admin account"
gcloud iam service-accounts keys create creds.json --iam-account terraform@PROYECTO.iam.gserviceaccount.com


# Permisos a nivel de projecto
https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/google_project_iam
Para dar un determinado permiso a una SA, usuario, etc



# Load balancer
https://github.com/gruntwork-io/terraform-google-load-balancer/blob/master/modules/http-load-balancer/main.tf

Se compone de varias primitivas.

Un esquema típico de una ip pública redirigiendo a un grupo de servidores sería:
global addr -> global forwarding rule -> target proxy (+cert) -> url map -> backend service -> instance group -> instances
                                                                                    -> health checks

Si falla el healtch check, revisar que hemos dado permiso a los rangos de IPs de loas LB de google para lanzar queries a nuestras VMs.


resource "google_compute_global_address" "default" {
  name         = "foo-address"
  ip_version   = "IPV4"
  address_type = "EXTERNAL"
}

resource "google_compute_global_forwarding_rule" "default" {
  name       = "global-rule"
  target     = google_compute_target_http_proxys.default.id
  port_range = "80"
  ip_address = google_compute_global_address.default.address
  load_balancing_scheme = "EXTERNAL"
}

resource "google_compute_target_https_proxy" "default" {
  name    = "https-proxy"
  url_map     = google_compute_url_map.default.id
  ssl_certificates = TODO
}

resource "google_compute_url_map" "default" {
  name            = "url-map-target-proxy"
  description     = "a description"
  default_service = google_compute_backend_service.tools_backend.id
}

resource "google_compute_backend_service" "tools_backend" {
  name          = "tools-backend-service"
  health_checks = [google_compute_health_check.jenkins_health_check.self_link]
  port_name   = "http"
  protocol    = "HTTP"
  timeout_sec = 10

  backend {
    group = google_compute_instance_group.tools_group.self_link
  }
}

resource "google_compute_health_check" "jenkins_health_check" {
  name               = "jenkins-login-health-check"
  check_interval_sec = 10
  timeout_sec        = 1

  http_health_check {
    port = 80
    request_path = "/login"
  }
}

resource "google_compute_instance_group" "tools_group" {
  name        = "tools-vm-group"

  instances = [
    module.tools01.instance_id,
  ]

  named_port {
    name = "http"
    port = "8080"
  }

  zone = "us-east1-b"
}




# IAP - identity aware proxy
Necesitaremos que el usuario, o service account, que esté ejecutando esto tenga "IAP Policy Admin"
Podemos dárselo en:
https://console.cloud.google.com/iam-admin/iam


## Brand
Creo que es la oauth consent screen
https://console.cloud.google.com/apis/credentials/consent?authuser=1&folder=&organizationId=&project=fr8tech&supportedpurview=project

resource "google_iap_brand" "project_brand" {
  support_email     = "support@example.com"
  application_title = "Cloud IAP protected Application"
  project           = google_project_service.project_service.project
}

Si ya exite tendremos que importarlo al tfstate:
terraform import google_iap_brand.default projects/PROYECTO/brands/ID_NUMERICO_PROYECTO

Luego tendremos que tener el google_iap_brand igual que el importado.
Podemos ver lo importado con:
terraform state show google_iap_brand.project_brand

Si no conocemos el ID numérico, podemos hacer un "list" a las brands
https://cloud.google.com/iap/docs/reference/rest/v1/projects.brands/list?authuser=1&apix_params=%7B%22parent%22%3A%22projects%2FMIPROYECTO%22%7D


## OAuth2.0 client
resource "google_iap_client" "iap_tools_apps" {
  display_name  = "Tools auth"
  brand         =  google_iap_brand.default.name
}

https://console.cloud.google.com/apis/credentials
Aqui podremos ver el objeto creado


## Permisos
A quien permitimos acceso.
Ejemplo permitiendo a todo el dominio.

resource "google_iap_web_iam_member" "access_iap_policy" {
  role      = "roles/iap.httpsResourceAccessor"
  member    = "domain:example.com"
}

En la config de IAP veremos en los permisos:
IAP-secured Web App User:
  example.com


## Revisión
https://console.cloud.google.com/security/iap
Mirar que todo diga que está correcto
