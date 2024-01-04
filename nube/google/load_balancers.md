Usar este módulo que simplifica mucho crear los LB
https://registry.terraform.io/modules/GoogleCloudPlatform/lb-http/google/latest


En verdad no existe el concepto load balancer, si no una suma de "primitivas" que lo conforman.
https://github.com/gruntwork-io/terraform-google-load-balancer/blob/master/modules/http-load-balancer/core-concepts.md#https-load-balancer-terminology

GCP uses non-standard vocabulary for load balancing concepts. In case you're unfamiliar with load balancing on GCP, here's a short guide:
  Global forwarding rules route traffic by IP address, port, and protocol to a load balancing configuration consisting of a target proxy, URL map, and one or more backend services.
  Target proxies terminate HTTP(S) connections from clients. One or more global forwarding rules direct traffic to the target proxy, and the target proxy consults the URL map to determine how to route traffic to backends.
  URL maps define matching patterns for URL-based routing of requests to the appropriate backend services. A default service is defined to handle any requests that do not match a specified host rule or path matching rule.
  Backends are resources to which a GCP load balancer distributes traffic. These include backend services, such as instance groups or backend buckets.

https://cloud.google.com/load-balancing/docs/backend-service#restrictions_and_guidance
If you need a VM to participate in multiple load balancers, you must use the same instance group as a backend on each of the backend services.



# http to https
https://stackoverflow.com/a/66256756

resource "google_compute_url_map" "http-redirect" {
  name = "http-redirect"

  default_url_redirect {
    redirect_response_code = "MOVED_PERMANENTLY_DEFAULT"  // 301 redirect
    strip_query            = false
    https_redirect         = true  // this is the magic
  }
}

resource "google_compute_target_http_proxy" "http-redirect" {
  name    = "http-redirect"
  url_map = google_compute_url_map.http-redirect.self_link
}

resource "google_compute_global_forwarding_rule" "http-redirect" {
  name       = "http-redirect"
  target     = google_compute_target_http_proxy.http-redirect.self_link
  ip_address = google_compute_global_address.static_pages.address
  port_range = "80"
}



# Rewrite URL
Lo que me llegue a "/api/" lo enviamos al servicio "ws" quitándole ese "/api".

defaultService: projects/XX/global/backendServices/-http
name: path-matcher-1
routeRules:
- matchRules:
  - prefixMatch: /api/
  priority: 0
  routeAction:
    weightedBackendServices:
    - backendService: projects/XX/global/backendServices/ws
      weight: 100
    urlRewrite:
      pathPrefixRewrite: /
