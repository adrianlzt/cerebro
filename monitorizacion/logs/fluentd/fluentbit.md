http://fluentbit.io/
http://fluentbit.io/documentation/0.8/about/fluentd_and_fluentbit.html

Es como un fluentd pequeño con menos funcionalidad.
La idea es usarlo para dispositivos embedidos.
Puede leer de distintas fuentes y enviar a distintos outputs.
Su footprint es mucho menor (150KB vs 20MB de fluentd).

Puede extenderse con plugins escritos en Go.


Esquema de funcionamiento:

input -> parser -> filter -> buffer -> routing -> [out1, out2, out3]


# Input plugins
http://fluentbit.io/documentation/0.12/input/

## systemd
Para obtener los logs intentará acceder a
  /run/log/journal
Si no lo consigue probará con:
  /var/log/journal

Tambien necesita leer el fichero /etc/machine-id para saber que directorio debe procesar


Podemos pasarle en la conf "DB" para almacenar la última posición del cursor analizada
Creará un fichero sqlite3

En caso de que se lea una entrada del journald, pero no se pueda flushear al output (porque este fallando y reintentando), si paramos el fluentbit perderemos esas lineas ya leidas pero que no pudieron escribirse.
Parece que hay un problema con systemd y es que siempre que arranca lee de nuevo la última linea que leyó.
https://github.com/fluent/fluent-bit/pull/383


# Output plugins
http://fluentbit.io/documentation/0.12/output/

Podemos especificar el parametro Retry_Limit para decidir cuantas veces se reintentará el output (mas info en Internals.Retries)


# Buffer
http://fluentbit.io/documentation/0.12/getting_started/buffer.html

Usar un buffer de disco local ante problemas con el agente.
-b path/
En path/ escribirá las tareas que va haciendo.
Si cuando lo paramos estaba haciendo retry en un output. Cuando volvamos a arrancar seguirá por ese punto.



# Backpressure
http://fluentbit.io/documentation/0.12/configuration/backpressure.html

Limitar los datos que entran porque no estamos pudiendo sacar los que tenemos hacia los outputs.




# Ejemplos
fluent-bit -i tcp -o stdout
  arrancar escuchando JSON por TCP plano y sacando los datos a stdout

bin/fluent-bit -i systemd -p Systemd_Filter="SYSLOG_IDENTIFIER=opencloud" -p DB=journald.db -e ../../fluent-bit-go/examples/out_gstdout/out_redis.so -o redis -p Retry_Limit=5 -f 1 -v
Ejemplo usando parametros para el input de systemd y usando un plugin escrito en go para redis
  -f 1, flush espera 1 segundo
  -v, verbose
  -p Retry_Limit, intentar 5 veces



# Crear plugins
https://github.com/fluent/fluent-bit/blob/master/GOLANG_OUTPUT_PLUGIN.md

Se pueden desarrollar plugins en golang para usarse en fluent bit.

Parece que la interfaz es funcional, aunque aún no se puede usar la config de fluent bit en los plugins de golang
https://github.com/fluent/fluent-bit/issues/298#issuecomment-309047967

Código de ejemplo:
https://github.com/fluent/fluent-bit-go
cd fluent-bit-go/examples/out_gstdout
go get github.com/fluent/fluent-bit-go/output
make
fluent-bit -i tcp -e out_gstdout.so -o gstdout


Un plugin de verdad escrito en go:
https://github.com/kubeup/fluent-bit-aliyun

Codigo en C de fluent-bit donde se llama a los plugins Go:
https://github.com/fluent/fluent-bit/blob/669dc377d5b87b482f84897506231bc0de5ee76c/src/proxy/go/go.c

Como fluent-bit convierte el timestamp a un unix timestamp:
https://github.com/fluent/fluent-bit/blob/669dc377d5b87b482f84897506231bc0de5ee76c/src/flb_time.c#L145



# Build
cd build/
cmake -DFLB_DEBUG=On -DFLB_TRACE=On -DFLB_JEMALLOC=On -DFLB_BUFFERING=On ..
make
ls bin/



# Internals

## Retries
Gestion de los retries:
https://github.com/fluent/fluent-bit/blob/669dc377d5b87b482f84897506231bc0de5ee76c/src/flb_task.c#L104

Por defecto el Retry_Limit será 1.
Podemos definir el valor que queramos en cada output.

Cuando sea necesario un retry se irá esperando cada vez más tiempo para reintentarlo:
https://github.com/fluent/fluent-bit/blob/669dc377d5b87b482f84897506231bc0de5ee76c/src/flb_scheduler.c#L184
