#!/usr/bin/env python

import sys
import importlib

lib = sys.argv[1]
datos = importlib.import_module(lib)

"xaioasd" in datos.HOSTS
