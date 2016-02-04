#!/usr/bin/env python

from joblib import Parallel, delayed
from random import randint
from datetime import datetime
from time import sleep

def f(x):
    sleep(randint(0,3))
    print("%s Inicio: %s" % (x, datetime.now()))
    sleep(randint(0,10))
    print("%s Fin: %s" % (x, datetime.now()))

l = [1,2,3,4,5,6]
Parallel(n_jobs=-1)(delayed(f)(i) for i in l)
