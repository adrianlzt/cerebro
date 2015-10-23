#!/usr/bin/env python

import sys
import json
import string
import random
def id_generator(size=11, chars=string.ascii_uppercase + string.ascii_lowercase + string.digits + ' '):
    return ''.join(random.choice(chars) for _ in range(size))

diccionario = {}
array = []

size = int(sys.argv[1] if len(sys.argv) > 1 else 10)

for n in range(1,size):
    host = id_generator()
    service = id_generator()
    host_service = "%s.%s" % (host, service)

    diccionario[host_service] = True
    array.append(host_service)


with open("diccionario_%s.json" % size, "w") as fd:
    json.dump(diccionario,fd)

with open("array_%s.json" % size, "w") as fd:
    json.dump(array,fd)
