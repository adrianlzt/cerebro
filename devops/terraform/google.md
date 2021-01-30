# Load balancer
https://github.com/gruntwork-io/terraform-google-load-balancer/blob/master/modules/http-load-balancer/main.tf

Se compone de varias primitivas.

Un esquema típico de una ip pública redirigiendo a un grupo de servidores sería:
global addr -> global forwarding rule -> target proxy (+cert) -> url map -> backend service -> instance group -> instances
                                                                                    -> health checks

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
  health_checks = [google_compute_http_health_check.jenkins_health_check.self_link]
  port_name   = "http"
  protocol    = "HTTP"
  timeout_sec = 10

  backend {
    group = google_compute_instance_group.tools_group.self_link
  }
}

resource "google_compute_http_health_check" "jenkins_health_check" {
  name               = "jenkins-login-health-check"
  request_path       = "/login"
  check_interval_sec = 10
  timeout_sec        = 1
  port = 80
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

