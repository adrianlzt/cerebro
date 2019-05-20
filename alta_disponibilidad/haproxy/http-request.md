https://cbonte.github.io/haproxy-dconv/2.0/configuration.html#4.2-http-request

Reglas que aplicaremos a la capa http.
Acceso/bloqueo.
Reescribir headers, destinos, etc.
Modificar maps.
Tracking.

http-request <action> [options...] [ { if | unless } <condition> ]


Un uso típico es definir alguna ACL y luego una http-request con un "if acl_anterior":
acl local_net src 192.168.0.0/16
http-request allow if local_net


Si ponemos varias variables despues del if, por defecto se uniran con AND.

http-request allow/deny/reject
Para la ejecución en ese punto, no se analizan más reglas.


Ejemplos:

Si el URL path contiene "/map/", contestamos al usuario con un 200, no enviando la petición al backend.
http-request deny deny_status 200 if { path_beg /map/ }


## early hints (http status 103)
Permite enviar una lista de objetos a precargar al cliente incluso antes de que el backend comience a responder.
Explicación: https://www.haproxy.com/blog/haproxy-1-9-has-arrived/

Ejemplo:
http-request early-hint Link "</script.js>; rel=preload; as=script"


# http-response
Primero se aplican los del backend, luego los del frontend.
