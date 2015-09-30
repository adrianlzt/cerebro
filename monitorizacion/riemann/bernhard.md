pip install bernhard

Enviar metrica:
import bernhard
c = bernhard.Client()
c.send({'host': 'myhost.foobar.com', 'service': 'myservice', 'metric': 12})

Realizar query:
q = c.query('true')
  nos devuelve todos los eventos


Solo el host que se llame pepe
c.query('host = "pepe"')


# Custom fields
>>> c.send({'host': 'pepe', 'service': 'avice2', 'metric': 122, 'attributes': {"project":"tools","env":"prod"}, 'ttl': 5})
True
>>> print c.query('host = "pepe"')[0]
time: 1442582157
service: "avice2"
host: "pepe"
ttl: 5.0
attributes {
  key: "env"
  value: "prod"
}
attributes {
  key: "project"
  value: "tools"
}
metric_d: 122.0
metric_f: 122.0

