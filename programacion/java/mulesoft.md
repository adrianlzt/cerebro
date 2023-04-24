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
