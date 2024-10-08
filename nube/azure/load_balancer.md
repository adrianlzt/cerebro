Los load balancers parece que solo son de capa 4 (TCP/UDP).
Para capa 7 les llaman Application gateway.

# Load balancer capa 4 / iLB

Pueden ser públicos o privados (internal LB).

## iLB

Detalle del problema y posibles soluciones:
<https://github.com/microsoft/Azure-ILB-hairpin>

Por defecto, al configurar el iLB, se activa el Direct Server Return (DSR).
Esto significa que el paquete no pasa por el LB, sino que va directamente a la máquina destino.
Si una máquina del backend pool intenta enviar un paquete al iLB, no funcionará. En tcpdump veremos que el paquete vuelve a entrar por la interfaz con la ip origen puesta a la IP de la misma máquina.

<https://learn.microsoft.com/es-es/azure/load-balancer/load-balancer-floating-ip>
En principio existe una configuración, _Enable Floating IP_, que debería permitir que una máquina del backend pool pueda enviar paquetes al iLB.
Esto lo hace poniendo la ip del iLB como dirección ip destino al pasar el paquete a los backend pools.
Para que esto funcione los nodos del backend pool deberán configurar esa IP como local.

El problema es que si tenemos un activo-pasivo, y configuramos la IP en el pasivo, cuando intente enviar tráfico al iLB, lo estará enviando localmente, por lo que no funcionará.

# Application gateway

<https://learn.microsoft.com/en-us/azure/application-gateway/create-ssl-portal>

Hace falta crear una subnet para colocar este AG, que no puede ser donde estén las VMs.

No hace falta configurar el firewall para que AG llegue a las VMs.

Si queremos un proxy de identidad (zero trust, estilo Google IAP), mirar entra.md

## TLS

Parece que no existe gestión automática de los certificados TLS.
Hace falta montar una arquitectura con un proceso que obtenga el cert y lo deje en un storage para que lo use el AG.
<https://intelequia.com/es/blog/post/automating-azure-application-gateway-ssl-certificate-renewals-with-let-s-encrypt-and-azure-automation>
<https://techblog.buzyka.de/2021/02/make-lets-encrypt-certificates-love.html>

Se basa en tener un "cron" que se ejecute periódicamente, obtenga el cert y se lo ponga al AG.
El AG deberá redirigir el tráfico a la tarea que se encargará de obtener el cert.

Los certificados se configuran en los listeners, cuando son de tipo HTTPS.

Como hacerlo a mano, usando "az" y "certbot": <https://trstringer.com/azure-key-vault-lets-encrypt/>

### keyvault-acmebot

<https://github.com/shibayan/keyvault-acmebot>

Automated ACME SSL/TLS certificates issuer for Azure Key Vault (App Gateway / Front Door / CDN / others)

Necesita acceso a la gestión de la zona DNS, ya que la usará para validar los challengues contra el proveedor de certificados (creará el registro TXT necesario para el dominio que pidamos).
También tenemos que dar permisos a la función sobre la zona DNS donde queremos crear los certs: <https://github.com/shibayan/keyvault-acmebot/wiki/DNS-Provider-Configuration#azure-dns>
Esto incluye crear la variable de entorno "Acmebot:AzureDns:SubscriptionId" con el id de la suscripción.

Una vez desplegado, tendremos que configurar la autenticación: <https://github.com/shibayan/keyvault-acmebot/wiki/Getting-Started#5-enable-app-service-authentication>
En la function app, ir a Settings -> Authentication
Añadir un identity provider, para poder autenticarnos.

### AKS

Configurar un pod en AKS para generar certs con Let's encrypt.

<https://learn.microsoft.com/en-us/azure/application-gateway/ingress-controller-letsencrypt-certificate-application-gateway>

## Esquema de la distintas partes

Frontend IP configurations: donde se configuran las IPs donde escucha

Listeners (vhost): puertos donde escucha, asociado a un frontend IP. Aquí es donde se configura el certificado (en caso de TLS) y los hostnames a los que contestará

Rules: como enrutar desde los listeners hacia los backends. Aquí se pueden poner reglas para decidir a que backend enviar según un path, etc.

Backend pools: a donde enviar el tráfico (VMs, IPs, domains, App Service, etc)
Backend settings: para definir el puerto y protocolo del backend y el health check a usar. Affinity y otras cosas.

Health probes: sondas para comprobar los backends.

# Troubleshooting

## Respuestas 502

Si tenemos un backend https, revisar bien el hostname que le estamos enviando. Debe matchear con el certificado que usamos entre appgw y el backend.
Tal vez la probe funcione porque está usando otra cabecera "Host".

# WAF / Web Application Firewall

<https://learn.microsoft.com/en-us/azure/application-gateway/log-analytics>

En loa AppGw podemos configurar un WAF para detectar posibles peticiones maliciosas y bloquearlas.

Para poder ver las peticiones al WAF y cuales son bloqueadas, tendremos que activar los logs en "Diagnostic settings".
Para ello primero deberemos crear un "Log Analytics workspace" donde los enviaremos.

Tras activar el envío de logs tardarán unos minutos en aparecer.

Las reglas que bloquean son las de OWASP.
Si por ejemplo vemos esto:
RuleSetType: OWASP CRS
RuleSetVersion: 3.2
RuleId: 949110

Encontraremos la regla en:
<https://github.com/coreruleset/coreruleset/blob/v3.2.3/rules/REQUEST-949-BLOCKING-EVALUATION.conf#L80>
