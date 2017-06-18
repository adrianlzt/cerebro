http://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm
http://restcookbook.com/
This site however, is about dealing with issues and questions people are facing over and over again when trying to create RESTful APIs.

REST: REpresentational State Transfer
is a set of constraints that ensure a scalable, fault-tolerant and easily extendible system


Richardson Maturity Model, para ver como de REST es nuestra API:
  - Level 0: las peticiones son enrutadas por un protocolo de transporte que será agnóstico a la aplicación.
             Se usará únicamente un punto de entrada URI y un método (POST)

  - Level 1: distinguimos entre distintos recursos (articles/1, articles/2). Tendremos varias URIs, aún solo un "verb"

  - Level 2: usar distintos verbos para distintas funciones (leer, guardar, borrar).
             Usar los códigos de respuesta para indicar el resultado de la operación
             Podemos tener una API RESTful sin usar HTTP, así que no usaríamos los verbs de http

  - Level 3: usa HATEOAS para que los clientes puedan descubrir la API


# HATEOAS - Hypertext As The Engine Of Application State
Que cuando nos hagan una petición en la respuesta demos los posibles caminos para continuar.
Por ejemplo, si pedimos una issue a github, en la respuesta tenemos también los links para modificarla, borrarla, resolverla, etc.
