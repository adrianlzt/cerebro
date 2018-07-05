#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#
# Copyright © 2018 Adrián López Tejedor <adrianlzt@gmail.com>
#
# Distributed under terms of the GNU GPLv3 license.

"""

"""

import time
import requests
import elasticapm
from elasticapm.traces import capture_span

# Con esta linea instrumentamos ciertas librerias (https://github.com/elastic/apm-agent-python/tree/master/elasticapm/instrumentation/packages)
elasticapm.instrument()

# Si no pasamos parametros pondra name="__main__.func_lenta", span_type="code"
@capture_span(name="minombrepropio", span_type="decorador")
def func_lenta():
    time.sleep(0.2)

# Configure the client manually
client = elasticapm.Client(
    {
        "FLUSH_INTERVAL": 1,
        "_WAIT_TO_FIRST_SEND": 0
    },
    service_name='PruebasConfig',
)

client.begin_transaction("spans1")
elasticapm.set_custom_context({"cosas": "datos_custom"})
elasticapm.set_context({
        "method": "GET",
        "http_version": "1.1",
        "socket": {
            "remote_address": "something"
        },
        "env": {
            "someenv": "somevalue"
        },
        "headers": {
            "someheader": "somevalue"
        },
        "body": "some body values",
        "url": {"full": "http://example.com"}
    }
    , "request")
elasticapm.set_user_context(username="pepe", email="pepe@example.com", user_id="abc")
elasticapm.tag(tag1="value1", tag2="value2")

# extra parece que no me hace caso
with capture_span("primerspan", "tipo1", extra={"url": "http://miurl"}):
    time.sleep(0.15)
#
# Skip frames creo que es para quitar ciertas capas del stack trace
# leaf no me queda claro que hace
with capture_span("segundospan", "tipo2", skip_frames=1, leaf=False):
    time.sleep(0.10)

with capture_span("span3", "tipo3"):
    time.sleep(0.10)

func_lenta()

# Estara instrumentada automaticamente
requests.get("http://httpbin.org/")

elasticapm.set_transaction_name("myapp.nombre9")
elasticapm.set_transaction_result("OK")
client.end_transaction()
# En vez de poner el set_transaction_name y set_transaction_result podemos pasarlos como params al end:
# end_transaction("myapp.mi_nombre", "todo ok")


# Estos se mostraran en la tab de "Errors"
try:
    x = int("five")
except ValueError:
    client.capture_exception()

client.capture_message('Billing process succeeded.')

client.capture_message(param_message={
    'message': 'Billing process for %s succeeded. Amount: %s',
    'params': ("customer.id", "order.total_amount"),
  },
  custom={
    "foo": "bar"
  }
)
