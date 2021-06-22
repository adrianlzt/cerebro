https://www.stunnel.org/index.html

Stunnel is a proxy designed to add TLS encryption functionality to existing clients and servers without any changes in the programs' code. Its architecture is optimized for security, portability, and scalability (including load-balancing), making it suitable for large deployments.

Tipico ejemplo, ponerle tunel ssl a redis


# openssl
Generar cert TLS autofirmado:
openssl req -batch -new -x509 -days 365 -nodes -out server.pem -keyout server.pem

Crear la conexión interna del tunel:
mkfifo request response

Crear el listener del tunel:
openssl s_server -quiet -cert server.pem -accept 4433 < response | tee -a request

Conectar el tunel al servidor real:
openssl s_client -quiet -connect CAMBIAR.SERVER:443 < request | tee -a response
  Parece que esta conex puede morir de vez en cuando, podemos hacer algo así para mantenerla viva:
  while true; do openssl s_client -quiet -connect CAMBIAR.SERVER:443 < request | tee -a response; done

curl http://localhost:4433

En el primer openssl veremos las peticiones.
En el segundo las respuestas.

Al terminar parar los openssl y borrar las fifo:
rm request response


