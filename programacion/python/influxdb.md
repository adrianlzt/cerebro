https://github.com/influxdata/influxdb-python
http://influxdb-python.readthedocs.org/en/latest/

pip install influxdb

from influxdb import InfluxDBClient
client = InfluxDBClient('127.0.0.1',database="prueba")
client.write_points([{"measurement": "prueba2", "tags": {"host":"somehome"}, "time": time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(1486384163)), "fields": {"load":3}}], time_precision='s')


Iniciar cliente sin ddbb específica, especificar en la query:

>>> from influxdb import InfluxDBClient
>>> client = InfluxDBClient('127.0.0.1','8086',user,password)
>>> client.query('show measurements', database='test')
ResultSet({'(u'measurements', None)': [{u'name': u'cpu'}]})


data = [
    {
        "measurement": "cpu_load_short",
        "tags": {
            "host": "server01",
            "region": "us-west"
        },
        "time": "2009-11-10T23:00:00Z",
        "fields": {
            "value": 0.64
        }
    }
]
client.write_points(data, database="test")

time_precision='s'
batch_size = n

Tambien se puede pasar un tags={} que se mergeara con los tags de cada punto


write_points() hace unas transformaciones y llama a write()

data = {
  'points': points,
  'tags': tags
}

params = {
  'db': database,
  'precision': time_precision,
  'rp': retention_policy
}

self.write(
  data=data,
  params=params,
  expected_response_code=204
)

write() usa make_lines para transformar 'data' en el protocolo line de influxdb y lo envia mediante POST

El timestamp puede ser un integer, texto que se parseara con dateutil.parser o un tipo datetime
