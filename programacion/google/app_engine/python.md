Podemos usar como esquelo esta app de bottle: appengine-bottle-skeleton/

Librerias incluidas en gae: https://cloud.google.com/appengine/docs/python/tools/built-in-libraries-27?hl=es
Ejemplo:
pycrypto:
app.yml
libraries:
- name: pycrypto
  version: "2.6"


# Lib externas
requests
pip install -t lib/ requests==2.3.0


# Debug
dev_appserver.py --dev_appserver_log_level debug .


# Tipos de datos
https://cloud.google.com/appengine/docs/python/ndb/properties#options



# Model
Se puede serializar con to_dict()
https://cloud.google.com/appengine/docs/python/ndb/modelclass#Model_to_dict

Se pueden incluir y excluir elementos.
No se incluye el id.
Si queremos incluirlo:
json.dumps([dict(p.to_dict(), **dict(id=p.key.id())) for p in Pasta.query().fetch()])

json.dumps([p.to_dict() for p in Pasta.query(Pasta.name == "Ravioli").fetch()])


# Logger
import logging
logging.debug("traza")

aparecera en la zona de Registros
