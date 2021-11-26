#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#
# Copyright © 2021 adrian <adrian@archer>
#
# Distributed under terms of the MIT license.

"""

"""
import modulo

import logging

logging.basicConfig(format='%(asctime)s %(filename)s %(levelname)s %(message)s', level=logging.DEBUG)
logger = logging.getLogger(__name__)

parser_logger = logging.getLogger('parser')
parser_logger.setLevel(logging.DEBUG)
ch = logging.StreamHandler()
formatter = logging.Formatter(fmt='%(levelname)s device=%(device)s %(message)s')
ch.setFormatter(formatter)
parser_logger.propagate = False  # Solo usar este StreamHandler, no el definido por basicConfi
parser_logger.handlers = [ch]

logger.warning("info msg main")
m = modulo.Modulo("nNn")
m.funcion()

m = modulo.Modulo("zZZZZ")
m.funcion()
