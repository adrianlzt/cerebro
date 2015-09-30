#!/usr/bin/env python

# Si lanzamos dos veces el programa, la segunda ejecucción se quedara parada a la espera de que se libere el lock

import flock
import time

with open('/tmp/file.lock', 'w') as f:
    blocking_lock = flock.Flock(f, flock.LOCK_EX)

    with blocking_lock:
        print("inicio")
        print("espera 5")
        time.sleep(5)
