#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#
# Copyright © 2021 adrian <adrian@archer>
#
# Distributed under terms of the MIT license.

"""

"""

import logging
logger = logging.getLogger('parser')

class Modulo:
    def __init__(self, n):
        self.logger = logging.LoggerAdapter(logger, {"device": n})

    def funcion(self):
        self.logger.info(f"funcion")
