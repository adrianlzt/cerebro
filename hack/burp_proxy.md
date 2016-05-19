https://portswigger.net/burp/proxy.html

Burp Proxy is an intercepting proxy server for security testing of web applications. It operates as a man-in-the-middle between your browser and the target application

# Instalación

## Arch
yaourt -S burpsuite



Para instalar el certificado ssl ir a 
http://burp


# Interceptar paquetes
En la pestaña "Proxy" -> "Intercept"

Por defecto captura las requests.
Si queremos capturar las responses ir a Options y activarlo.

Por cada requests/response capturada nos aparecerá la petición en texto plano donde podremos modificarla al gusto.
Luego daremos a forward para que continue
