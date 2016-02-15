https://github.com/influxdata/influxdb-python
http://influxdb-python.readthedocs.org/en/latest/

Iniciar cliente sin ddbb específica, especificar en la query:

>>> from influxdb import InfluxDBClient
>>> client = InfluxDBClient('10.5.2.180','8086',user,password)
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
