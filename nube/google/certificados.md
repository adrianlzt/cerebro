Podemos solicitar un certificado a google y el gestionará la creación
https://cloud.google.com/load-balancing/docs/ssl-certificates/troubleshooting#certificate-managed-status

El cert normalmente lo asignaremos al frontend de un load balancer.

Tras asignarlo, tendremos que ir a nuestro gestor de DNS y apuntar el dominio a ese frontend, para que la autoridad certificadora pueda validarlo.
Mientras esté en este proceso veremos el cert como: PROVISIONING
Puede tardar hasta 1h.

Luego pasará a ACTIVE, donde aún puede tardar hasta 30' en estar disponible para el cert.

En terraform estos certs son https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_managed_ssl_certificate
