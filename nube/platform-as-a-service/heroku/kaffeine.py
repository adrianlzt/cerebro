#!/usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#
# Copyright © 2016 Adrián López Tejedor <adrianlzt@gmail.com>
#
# Distributed under terms of the GNU GPLv3 license.

"""
Registra la app en kaffeine.herokuapp.com
El nombre de la app lo poenmos en la variable "app_name".
En "hora_dormir_utc" ponemos la hora UTC de cuando va a
empezar el periodo de 6h que debe dormir la app
"""

import mechanize
from urllib2 import quote
from bs4 import BeautifulSoup
br = mechanize.Browser()

app_name = "pepe"
hora_dormir_utc = "23:00"

try:
  soup = BeautifulSoup(br.open("http://kaffeine.herokuapp.com/"), "html.parser")
except Exception as e:
  raise Exception("Error conectando con kaffeine.herokuapp.com: %s" % e)
csrf_token = soup.find(name="meta",attrs={"name": "csrf-token"}).get("content")
req = br.request_class("http://kaffeine.herokuapp.com/register", headers={"X-CSRF-Token": csrf_token})
try:
  res = br.open(req, data="name=%s&nap=true&bedtime=%s" % (app_name, quote(hora_dormir_utc)))
except Exception as e:
  raise Exception("Error registrando la app en kaffeine.herokuapp.com: %s" % e)

print("App registrada correctamente en kaffeine.herokuapp.com")
