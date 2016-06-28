#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#
# Copyright © 2016 Adrián López Tejedor <adrianlzt@gmail.com>
#
# Distributed under terms of the GNU GPLv3 license.

"""

"""

from bottle import Bottle, request, static_file

bottle = Bottle()


@bottle.route('/')
def main():
    print("traza")
    return "hola"
