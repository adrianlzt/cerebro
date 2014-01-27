http://api.mongodb.org/python/current/

PyMongo is a Python distribution containing tools for working with MongoDB, and is the recommended way to work with MongoDB from Python. This documentation attempts to explain everything you need to know to use PyMongo.

apt-get install python-pymongo

Lo básico:

from pymongo import MongoClient
from bson import ObjectId

db = MongoClient('maquina').nombre

query = {'res.hist.group': 'front_support'} # where responsible.historical.group = dsmc_front_office
cursor = db.assur.incid.find(query)

for doc in cursor:
  ...


Conectar:
db = MongoClient('localhost:49153')

Databases:
db.database_names()

Database beta
