http://microservices.io/patterns/microservices.html
https://www.nginx.com/blog/introduction-to-microservices/

Definir la arquitectura como una estructura de aplicaciones ligeramente acopladas (servicios colaborativos).
Dividir según la función que haga cada uno, ejemplo: pedidos, clientes, etc

La comunicación entre ellos se lleva a cabo síncronamente (por ejemplo HTTP/REST) o asíncronamente (ejemplo AMQP).

Cada servicio tiene su propia base de datos (para estar desacoplado del resto).
Para mantener la consistencia user una arquitectura dirigida por eventos: los servicios generan eventos para lo que quieren hacer y deben esperar la respuesta de los servicios que requieran.


Pros:
  - servicios pequeños, fáciles de entender y entrar a desarrollar. Arrancan rádio
  - despliegues independientes
  - fácil escalado
  - mejora el aislado de errores. Un crash en un servicio no afectará al resto
  - quitamos el asociarnos a una tecnología. Podemos cambiar las tecnologías de los distintos servicios al ser pequeños

Cons:
  - complejidad al tener un sistema distribuído! testing complicado. Hace falta desarrollar los mecanismos de intercomunicación
  - complejidad en el despliegue y en la administración
  - mayor consumo de memoria


# Ejemplos de microservices
http://eventuate.io/exampleapps.html

# Monitorizacion / tracing
programacion/tracing.md

Problemas con los microservicios, preguntas que hacerte antes de elegir esta arquitectura:
https://news.ycombinator.com/item?id=16200007
