from pymongo import MongoClient

server = MongoClient()
for db in server.database_names():
    print db, '->', server[db].system.namespaces.count()


