#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#
# Copyright © 2016 Adrián López Tejedor <adrianlzt@gmail.com>
#
# Distributed under terms of the GNU GPLv3 license.

"""
"""

from threading import Timer
from datetime import datetime
from time import sleep

class RepeatedTimer(object):
    def __init__(self, interval, function, delay, *args, **kwargs):
        self._timer     = None
        self._stop      = False
        self._running   = False
        self.function   = function
        self.interval   = interval
        self.args       = args
        self.kwargs     = kwargs
        sleep(delay) # Retrasamos la primera ejecucion delay segundos
        self._run()

    def _run(self):
        if self._stop:
            return
        self._running = True
        self.function(*self.args, **self.kwargs)

        # Program next execution
        self._timer = Timer(self.interval, self._run)
        self._timer.daemon = True # Stop this thread if main program exits
        self._timer.start()
        self._running = False

    def stop(self):
        """Will stop further executions"""
        self._timer.cancel()
        self._stop = True

    def resume(self):
        """Will execute function now if it is not running"""
        if not self._running:
            self._timer.cancel()
            self._run()


HILO=0

def hello(name):
    global HILO
    hilo = HILO
    HILO += 1
    print("[%s][%s] starting %s!" % (datetime.now().strftime("%H:%M:%S"),hilo,name))
    for i in range(0,2):
        print(".")
        sleep(1)
    print("[%s][%s] end %s!" % (datetime.now().strftime("%H:%M:%S"),hilo,name))

print("starting...")
rt = RepeatedTimer(2, hello, 0, "World") # it auto-starts, no need of rt.start()

#sleep(7) # your long-running job goes here...
#print("resume!")
#rt.resume() # better in a try/finally block to make sure the program ends!
#sleep(4) # your long-running job goes here...
#print("resume!")
#rt.resume() # better in a try/finally block to make sure the program ends!

#sleep(25) # your long-running job goes here...
#rt.stop() # better in a try/finally block to make sure the program ends!
