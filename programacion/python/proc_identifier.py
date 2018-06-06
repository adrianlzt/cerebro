#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#
# BORRADAS PARTES, solo dejado lo interesante para saber como cachear
#


import json
import os
import re
import sys
import argparse
import pickle
import operator
from cachetools import cachedmethod

CACHE_FILE = "proc_identifier.cache"

def gen_key(proc_identifier, cmd, args="", os="unix"):
    """
    Clave que usaremos para determinar si el resultado ya esta en la cache.
    Lo que hacemos aqui es ignorar el objecto ProcIdentifier
    """
    return (cmd, args, os)

class ProcIdentifier:
    def __init__(self)
        self.cache = {}
        if os.path.isfile(CACHE_FILE):
            with open(CACHE_FILE, 'rb') as f:
                self.cache = pickle.load(f)
        logger.warn(f"cache {self.cache}")

    def _load_rules(self, rules_file):
        with open(rules_file, "r") as fd:
            self.rules = json.load(fd)

    def save_cache(self):
        with open(CACHE_FILE, 'wb') as f:
            pickle.dump(self.cache, f)

    @cachedmethod(cache=operator.attrgetter('cache'), key=gen_key)
    def identify(self, cmd, args, os = "unix"):
        do_work()
        return discovered
