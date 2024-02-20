Los load balancers parece que solo son de capa 4 (TCP/UDP).
Para capa 7 les llaman Application gateway.

# Application gateway
https://learn.microsoft.com/en-us/azure/application-gateway/create-ssl-portal

Hace falta crear una subnet para colocar este AG, que no puede ser donde estén las VMs.

No hace falta configurar el firewall para que AG llegue a las VMs.

Si queremos un proxy de identidad (zero trust, estilo Google IAP), mirar entra.md

## TLS
Parece que no existe gestión automática de los certificados TLS.
Hace falta montar una arquitectura con un proceso que obtenga el cert y lo deje en un storage para que lo use el AG.
https://intelequia.com/es/blog/post/automating-azure-application-gateway-ssl-certificate-renewals-with-let-s-encrypt-and-azure-automation
https://techblog.buzyka.de/2021/02/make-lets-encrypt-certificates-love.html

Se basa en tener un "cron" que se ejecute periódicamente, obtenga el cert y se lo ponga al AG.
El AG deberá redirigir el tráfico a la tarea que se encargará de obtener el cert.

### keyvault-acmebot
https://github.com/shibayan/keyvault-acmebot

Automated ACME SSL/TLS certificates issuer for Azure Key Vault (App Gateway / Front Door / CDN / others)

Necesita acceso a la gestión de la zona DNS, ya que la usará para validar los challengues contra el proveedor de certificados (creará el registro TXT necesario para el dominio que pidamos).

## Esquema de la distintas partes

Frontend IP configurations: donde se configuran las IPs donde escucha

Listeners (vhost): puertos donde escucha, asociado a un frontend IP. Aquí es donde se configura el certificado (en caso de TLS) y los hostnames a los que contestará

Rules: como enrutar desde los listeners hacia los backends. Aquí se pueden poner reglas para decidir a que backend enviar según un path, etc.

Backend pools: a donde enviar el tráfico (VMs, IPs, domains, App Service, etc)
Backend settings: para definir el puerto y protocolo del backend y el health check a usar. Affinity y otras cosas.

Health probes: sondas para comprobar los backends.
