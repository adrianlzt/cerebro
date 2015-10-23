#!/usr/bin/env python

import sys
import json
import time

fichero = sys.argv[1]

with open(fichero, 'r') as fd:
    data = json.load(fd)

if len(sys.argv) == 3:
    data = set(data)
    fichero = "set_%s" % fichero

start_time = time.time()
"xaioasd" in data
end_time = time.time()

total_time = end_time-start_time

print("%s: %s" % (fichero,total_time))
