#!/usr/bin/env python

import sys
import json

fichero = sys.argv[1]

with open(fichero, 'r') as fd:
    data = json.load(fd)

"xaioasd" in data
