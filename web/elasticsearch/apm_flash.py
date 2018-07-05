import time
import requests
from flask import Flask
from elasticapm.traces import capture_span
from elasticapm.contrib.flask import ElasticAPM

app = Flask(__name__)
apm = ElasticAPM(app, service_name='MIAPP')

def mifunc(edad):
    time.sleep(edad)
    return edad*2

@app.route("/")
def hello():
    try:
        requests.get("http://localhost:8080")
    except Exception:
        pass
    with capture_span("mifirma", "some.type", {"url": "miurl"}):
        edad = mifunc(1)
    with capture_span("segundafirma", "some.type", {"url": "miurl"}):
        edad = mifunc(2)
    with capture_span("tercera", "some.type", {"url": "miurl"}):
        edad = mifunc(1)
    return "Hello World!"

if __name__ == "__main__":
    app.run()
