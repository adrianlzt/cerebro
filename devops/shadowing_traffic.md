Enviar una copia el tráfico dirigido a nuestra app a otro servicio.
Esto puede servirnos para probar una nueva release.

# Otras opciones más simples y peores
GoReplay
https://github.com/buger/goreplay
Reenvia tráfico.
Pero no parece tener, al menos en la versión opensource, un comparador.

TrafficMirror
https://github.com/rb3ckers/trafficmirror
Nos permite añadir varios servers para hacer shadow.
No tiene interfaz para comparar respuestas

https://github.com/mkevac/goduplicator




# Diffy
https://github.com/opendiffy/diffy
https://blog.twitter.com/engineering/en_us/a/2015/diffy-testing-services-without-writing-tests.html
  artículo de cuando lo publicaron en twitter

Captura el tráfico y lo envía a 3 sitios:
 - nuestra app
 - copia de nuestra app (para distinguir peticiones no determinísticas)
 - nueva release de nuestra app

Tiene una interfaz web donde nos muestra el porcentaje de peticiones distintas y cuales son las diferencias.

El fork de opendiffy no contesta al cliente con la respuesta (https://github.com/opendiffy/diffy/issues/28)
Este fork de opendiffy si envía respuesta al cliente: https://github.com/hemanth-s-a/diffy
En la version de twitter si existe esa opción (https://github.com/twitter/diffy/pull/48)

podman run --rm -it --net=host --add-host "diffyproject.appspot.com:0.0.0.0" adrianlzt/diffy:hemanth-s-a-c50288c -candidate=localhost:9992 -master.primary=localhost:9990 -master.secondary=localhost:9991 -service.protocol=http -serviceName='Test-Service' -proxy.port=:8880 -admin.port=:8881 -http.port=:8888 -rootUrl=localhost:8888 -summary.email=some@email.com -responseMode=primary -resource.mapping='/query;query,/search;search,/;root' -allowHttpSideEffects=true

Para que sí se conteste al cliente:
  -responseMode primary/secondary/candidate

Si queremos permitir POST/PUT/DELETE activar:
  -allowHttpSideEffects=true

Por defecto, las peticiones se agruparán según el valor del header "Canonical-Resource".
Si no tiene la cabera se pondrán en undefined_endpoint.
Ejemplo para definir el service: curl -s -i -H "Canonical-Resource : json" http://localhost:8880/foo/bar

Podemos crear un mapping manualmente:
-resource.mapping='/foo/:param;f,/b/*;b,/ab/*/g;g,/z/*/x/*/p;p'

De esta maneras, las peticiones a /foo/ se llamarán "f"
Las peticiones a /b/ se llamarán "b", etc

Formato: <pattern>;<resource-name>[,<pattern>;<resource-name>]*



Por defecto tiene instalado un backend para enviar el tráfico a diffyproject.appspot.com.
Metemos una entrada en /etc/hosts para descartar ese tráfico.
Veremos trazas tipo:
10:04:08.469 [finagle/netty4-2-13] INFO com.twitter.finagle - FailureAccrualFactory marking connection to "diffyproject.appspot.com:443" as dead. Remote Address: Inet(diffyproject.appspot.com/0.0.0.0:443,Map())



Interfaz web admin:
http://127.0.0.1:8881/admin

Interfaz web donde ver las peticiones y las comparaciones:
http://localhost:8888/

Las peticiones las tenemos que enviar a
http://localhost:8880

El las enviará al master.primary, master.secondary y candidate.
Nos devolverá la respuesta, si hemos especificado -responseMode.

En la interfaz web podremos ver si existen diferencias en las respuestas.
Parece que tienen bastante inteligencia, por ejemplo quitando el ruido (diferencias entre los masters).
También nos puede decir, por ejemplo, si la diferencia entre las respuestas es el orden (en caso de un array json).

Cuando enuentra una diferencia nos muestra los datos:
62.50% failing | 5 diffs | 62.50% noise
Nos está diciendo cuantas peticiones son distitnas.
Cuantos ejemplos de diferencias tenemos
Y cuanto porcentaje de las diferencias son también distintas con el secondary



# Diferencia
https://github.com/lordofthejars/diferencia

Otra opción, en go.

Docker
docker run --rm -ti -p 8080:8080 -p 8081:8081 -p 8082:8082  lordofthejars/diferencia:0.6.0 start --candidate http://10.1.2.4:3005 --primary http://10.1.2.4:3004 --secondary http://10.1.2.4:3044 -u --serviceName API -m

-m contesta al cliente con la respuesta del primary
8080 es el puerto del proxy
8081 prometheus
8082 interfaz admin, api + dashboard


Web UI
http://localhost:8082/dashboard/

Menos potente que Diffy.
No nos permite ignorar ciertas diferencias.
No entiende, por ejemplo, que la diferencia en un array json es el orden.
Para poder activar el "noise detection" tenemos que rearrancarlo.
