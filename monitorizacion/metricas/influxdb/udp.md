https://docs.influxdata.com/influxdb/v0.10/write_protocols/udp/

Some OSes (most notably, Linux) place very restricive limits on the performance of UDP protocols. Recent versions of FreeBSD, OSX, and Windows do not have this problem. It is highly recommended that you increase these OS limits to 8MB before trying to run large amounts of UDP traffic to your instance. 8MB is a starting recommendation, and should be adjusted to be in line with your read-buffer plugin setting.

/etc/influxdb/influxdb.conf
[[udp]]
  enabled = true
  bind-address = ":8086"
  database = "udp"


Si usamos el protocolo UDP solo se puede escribir en una base de datos.
https://github.com/influxdata/influxdb/issues/5156
https://github.com/influxdata/influxdb/pull/5721


# Realizando la PR

Se coge el punto, se parsea y se mete en el canal de batcher
https://github.com/influxdata/influxdb/blob/master/services/udp/service.go#L183
      points, err := models.ParsePointsWithPrecision(buf, time.Now().UTC(), s.config.Precision)
      ...
      s.batcher.In() <- point

En otro hilo se sacan los puntos y se almacenan
https://github.com/influxdata/influxdb/blob/master/services/udp/service.go#L130
    case batch := <-s.batcher.Out():
			if err := s.PointsWriter.WritePoints(&cluster.WritePointsRequest{
				Database:         s.config.Database,
				RetentionPolicy:  s.config.RetentionPolicy,
				ConsistencyLevel: cluster.ConsistencyLevelOne,
				Points:           batch,


Haría falta que el parser sacase de alguna parte la database donde se escribe:
https://github.com/influxdata/influxdb/blob/master/models/points.go#L192

	pt := &point{
		key:    key,
		fields: fields,
		ts:     ts,
	}

Ahí los datos serían:
key -> measurement,tag1=value1,tag2=value=2
fields -> field1=value1,field2=value2
ts -> fecha, no obligatoria

Podríamos usar un tag para especificar la database

El problema es que en el service/udp tendriamos que abrir el batch de puntos para analizar uno a uno y ver a que db lo escribimos.
Esto seguramente hiciese perder mucha performance

Tal vez una posibilidad sería un flag al comienzo de la transmisión que indicase que todas las metricas que vamos a enviar van a tal bd.
Se haría aquí:
https://github.com/influxdata/influxdb/blob/master/models/points.go#L164

Idea:
$bd=pepito
medida1 value=1
medida2 value=2


Ahora el problema sería como pasar el valor de la base de datos a través del canal.
ParsePointsWithPrecision tendría que devolver un objeto con []Point{} por un lado y el nombre de la bd por otro.

Luego al escribirlos sería algo tipo:
    case batch := <-s.batcher.Out():
      if err := s.PointsWriter.WritePoints(&cluster.WritePointsRequest{
        //Database:         s.config.Database,
        Database:         batch[bd],
        RetentionPolicy:  s.config.RetentionPolicy,
        ConsistencyLevel: cluster.ConsistencyLevelOne,
        Points:           batch[points],


La pregunta es si podemos asegurar que el batch contiene puntos todos de la misma bd.

https://github.com/influxdata/influxdb/blob/master/services/udp/service.go#L162
Parece que sería aquí donde se decide como se pasan los datos al parser
			buf := make([]byte, s.config.UDPPayloadSize)
			n, _, err := s.conn.ReadFromUDP(buf)

Parece que se leen UDPPayloadSize bytes de golpe y se pasan.
Temo que esto podría cortar donde se define la bd.



Tengo la database, ahora se pasa punto por punto al batcher


      for _, point := range points {
        s.batcher.In() <- point
      }
Ahora ya no me queda claro si pasa punto por punto o todos de golpe
El tema es como pasar más variables ahí, supongo que un struct tipo:
s.batcher.In() <- PuntoDB{point,database}

Pero si no los pasa de golpe tambien vaya castaña
El batcher es el que se encarga de pasar estas cosas en batch
Podría joder mi implementacion? Si se dedica a mezclar cosas de distintos envios
Se podria hacer un flush tras cada lectura de udp para evitarlo.

Como pasar la database a través del batcher??
Es un mojon esto. A lo mejor haciendo otro canal por donde se envie


IDEA:
un nuevo batcher.OutDb() que me de la database.

Si al hacer un SetDatabase la función detecta que estamos modificando el valor, hacer un flush de las metricas que queden.

Cuando se reciben las métricas para hacer el WritePoints, hacer un GetDatabase() para coger el nombre.
Este siempre estará con el valor de la ultima database que ha visto pasar el parser.
CUIDADO! que pasa con las métricas sin database!



Cambio de dirección.
Parece que la lectura de UDP trata cada línea independientemente, al menos cuando lo envío con:
echo -e "@db\nmetrica valor=2" > /dev/udp/127.0.0.1/8086
Entonces, si enviamos un "@database" al comienzo el problema es que no podemos distinguir el envío de métricas con db y envío de métricas sin database predefinida.
Mi idea era que cuando llegue un @database, a partir de ahí enviar todas las métricas a esa database hasta que llegase otro @x, pero con este sistema no veo la forma de distinguir un paquete que pertenece a la database de uno que no ha definido database.

Así que ahora mejor intentar parsear el contenido.


Idea, el batcher solo se usa por los services graphite, opentsdb, collectd y udp
Para el caso de graphite y udp, al menos, tiene sentido el meter la db en la misma línea, y que cuando se envíe el punto al batcher se pase con la db.
En batcher los puntos se organizan en estructuras diferenciadas por db.
Y cuando se van sacando por el canal se pasa esta estructura, que luego se trata para escribir cada punto a su database.

Si el parseo de la database se hace en el batcher no tenemos que tocar código del envío de datos:
s.batcher.In() <- point
