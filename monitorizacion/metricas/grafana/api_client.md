git clone git@github.com:adrianlzt/grafana_api_client.git
cd grafana_api_client
python setup.py install

python
from grafana_api_client import GrafanaClient
client = GrafanaClient(("admin", "admin"), host="192.168.0.5", port=80)

>>> client.org()
{'id': 18, 'address': {'city': '', 'address1': '', 'country': '', 'address2': '', 'zipCode': '', 'state': ''}, 'name': 'skel'}


# Orgs
Crear org
client.orgs.create(name="testapi")

Consultar una org
client.make_raw_request("GET","orgs/9","")

Cambiar org activa
client.make_raw_request("POST","user/using/4","")
