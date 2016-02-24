https://docs.influxdata.com/influxdb/v0.10/guides/writing_data/
https://docs.influxdata.com/influxdb/v0.10/write_protocols/line/

localhost:8086

create a database
curl -X POST 'http://localhost:8086/db?u=root&p=root' -d '{"name": "site_development"}'


# Procolo INLINE
curl -G 'http://localhost:8086/query?pretty=true' --data-urlencode "db=mydb" --data-urlencode "q=SELECT value FROM cpu_load_short WHERE region='us-west'"

curl -i -XPOST 'http://localhost:8086/write?db=mydb' --data-binary 'cpu_load_short,host=server01,region=us-west value=0.64 1434055562000000000'

udp:
echo "medida value=3" > /dev/udp/127.0.0.1/8086


El timestamp debe ser en microsegundos.

Si queremos pasar un timestamp en segundos debemos especificarlo:
curl -i -XPOST 'http://localhost:8086/write?db=tools&precision=s' --data-binary 'prueba value=99.0 1452594857'

Para meter varias métricas separarlas por cambios de linea (no vale con poner \n, al menos no funciona con curl, parece que lo escapa)


[key] [fields] [timestamp]

La key debe escapar espacios en blanco y comas: \   \,

fields: mirar tipos_de_datos.md

Timestamp: opcional (heredará el timestamp del server en el momento actual)
Se pone un unix epoch, que puede tener hasta microsegundos: 1434055562000000000
Si no especificamos la unidad del timestamp, se asume que esta en microsegundos (timestamp normal + 000000000)

Ejemplos:
cpu,host=server01,region=uswest value=1 1434055562000000000
cpu,host=server\ 01,region=uswest value=1,msg="all systems nominal"

Ejemplo para cargar datos random:
while true; do
curl -i -XPOST 'http://localhost:8086/write?db=test' --data-binary "random value=$[ ($RANDOM % 10) +1 ]i"
sleep 5
done

## Databases
curl -u "admin:IadminInflux10" "http://192.168.22.95:8086/query?q=SHOW+DATABASES


# Errores

## Tipos de datos
Cuidado con enviar datos de tipo integer y luego intentar enviar tipo double:

curl -i -XPOST 'http://192.168.22.95:8086/write?db=test&precision=s' -d "prueba1 value=1i"
curl -i -XPOST 'http://192.168.22.95:8086/write?db=test&precision=s' -d "prueba1 value=1.2"
{"error":"write failed: field type conflict: input field \"value\" on measurement \"prueba1\" is type float64, already exists as type integer"}



## Protocolo inline
Si enviamos varias métricas en un único curl y algunas de ellas tiene un formato incorrecto, se desecharán todas.
