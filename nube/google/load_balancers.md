En verdad no existe el concepto load balancer, si no una suma de "primitivas" que lo conforman.
https://github.com/gruntwork-io/terraform-google-load-balancer/blob/master/modules/http-load-balancer/core-concepts.md#https-load-balancer-terminology

GCP uses non-standard vocabulary for load balancing concepts. In case you're unfamiliar with load balancing on GCP, here's a short guide:
  Global forwarding rules route traffic by IP address, port, and protocol to a load balancing configuration consisting of a target proxy, URL map, and one or more backend services.
  Target proxies terminate HTTP(S) connections from clients. One or more global forwarding rules direct traffic to the target proxy, and the target proxy consults the URL map to determine how to route traffic to backends.
  URL maps define matching patterns for URL-based routing of requests to the appropriate backend services. A default service is defined to handle any requests that do not match a specified host rule or path matching rule.
  Backends are resources to which a GCP load balancer distributes traffic. These include backend services, such as instance groups or backend buckets.
