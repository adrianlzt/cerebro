https://github.com/buger/gor

HTTP traffic replay in real-time. Replay traffic from production to staging and dev environments
Podemos usarlo para capturar tráfico y luego reenviarlo a otro endpoint.

Ciertas funcionalidades solo están en una versión de pago.


# Save and replay
Capturar tráfico http enviado al puerto 8081 (escuchará en todas las interfaces):
gor --input-raw :8081 --output-file=request.gor --verbose 10

Si tenemos una captura de tcpdump, podemos usar tcpreplay para capturar ese tráfico guardado en el formato de gor.
Lo que haremos es arrancar gor escuchando en el puerto que queremos y luego lanzar el tcpreplay.
sudo tcpreplay -i lo fichero.cap


Genera el fichero requests_0.gor (texto plano) donde está lo capturado.


Replay de las peticiones, enviándolas ahora a http://127.0.0.1:8084
gor --output-http http://127.0.0.1:8084 --input-file=requests_0.gor --verbose 10

Tras enviar la/las peticiones, se quedará abierto.
No veo opción para salir al terminar. Podemos usar "-exit-after 20s" poniendo un valor de tiempo de cuando sabemos que ha terminado.

Si queremos que siga en loop enviando el contenido del fichero:
-input-file-loop



Si queremos simplemente sacar las peticiones por stdout (descomprimiendo si está en gzip)
gor --input-file=skydive_one_bad_req.gor -output-stdout -prettify-http



# Formato del fichero donde almacena las peticiones
Podemos editar el fichero con vim si queremos quitar algunas peticiones, modificarlas, etc.
Hay que respetar que cada petición empieza con un header
1 c1f60fa00a12530c84577ce0 1621941816505042939 8888843
y termina con la línea
🐵🙈🙉

El significado del header: payloadType, uuid, timing, latency

El payloadType
    RequestPayload          = '1'
    ResponsePayload         = '2'
    ReplayedResponsePayload = '3'
Detalles en protocol.go

Para HTTP el header es:
ReplayedResponsePayload, uuid, start.UnixNano(), stop.UnixNano() - start.UnixNano()



