https://graphql.org/code/#python

# sgqlc
## Instalar
pip install sgqlc

## Auto generar código
https://github.com/profusion/sgqlc#code-generator

Bajarnos el schema en formato .json
python -m sgqlc.introspection --exclude-deprecated --exclude-description http://localhost:4001/query schema.json

Generar el código python
sgqlc-codegen schema schema.json netexternal.py


También se puede generar código python a partir de una query/mutation.
Metemos la query/mutation en el fichero *.gql
"netexternal" debe coincidir con el nombre *.py del generador de schema.
sgqlc-codegen operation --schema schema.json netexternal operations.py mutation_add_switch.gql


Usar esta operación para atacar a un endpoint:

import sys
import json
from sgqlc.endpoint.http import HTTPEndpoint
from operations import Operations
endpoint = HTTPEndpoint("http://127.0.0.1:4001/query")
op = Operations.mutation.add_switch_vlan
data = endpoint(op)
json.dump(data, sys.stdout, sort_keys=True, indent=2, default=str)
