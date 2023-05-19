Levantar un mule con una app usando docker (me falla el build de la app de mule)
https://github.com/manikmagar/mule4-examples/tree/master/say-hello-mule4-docker

Para mule3 la app que dejemos en apps/ debe ser un directorio (no un .jar).

Ejemplo de app:
https://gist.github.com/adrianlzt/b1c336670d055a5c1bda2ed1db4bc72a


# JMX
Configuración necesaria para que funcione JMX.
https://stackoverflow.com/a/47339803

Probado con jolokia:
curl -s -X POST -H 'Content-Type: application/json' http://localhost:8080/jolokia/read -d '[
  {"type":"read",
   "mbean":"Mule*:name=MuleContext",
   "attribute": "InstanceId",
   "target":{
     "url":"service:jmx:rmi:///jndi/rmi://10.132.0.6:9999/jmxrmi",
     "user":"root",
     "password":"root"
   }
  }
]'
