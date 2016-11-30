#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#
# Copyright © 2016 Adrián López Tejedor <adrianlzt@gmail.com>
#
# Distributed under terms of the GNU GPLv3 license.

"""
Cuando tiempo tarda en ejecutarse una func segun time.time()
Mide el tiempo de ejecucción de la funcion work()
"""

from functools import wraps
from datetime import datetime
import time

def timing_clk(function):
    @wraps(function)
    def wrapper(*args,**kwargs):
        time1 = time.clock()
        ret = function(*args,**kwargs)
        time2 = time.clock()
        return ret, (function.__str__(), (time2 - time1))
    return wrapper

@timing_clk
def workclk():
    print("trabajando")
    time.sleep(1)
    return 0

def timing_tm(function):
    @wraps(function)
    def wrapper(*args,**kwargs):
        time1 = time.time()
        ret = function(*args,**kwargs)
        time2 = time.time()
        return ret, (function.__str__(), (time2 - time1))
    return wrapper

@timing_tm
def worktm():
    print("trabajando")
    time.sleep(1)
    return 0

def timing_dt(function):
    @wraps(function)
    def wrapper(*args,**kwargs):
        time1 = datetime.now()
        ret = function(*args,**kwargs)
        time2 = datetime.now()
        return ret, (function.__str__(), (time2 - time1))
    return wrapper

@timing_dt
def workdt():
    print("trabajando")
    time.sleep(1)
    return 0

if __name__ == "__main__":
    ret,timing = workdt()
    print("timing de work con datetime: %s  %s\n\n" % timing)

    ret,timing = workclk()
    print("timing de work con time.clock: %s  %s\n\n" % timing)

    ret,timing = worktm()
    print("timing de work con time.time: %s  %s" % timing)
    # timing[1].total_seconds() si queremos obtener los segundos que ha tardado
