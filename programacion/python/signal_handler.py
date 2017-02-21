#!/usr/bin/env python
# man 7 signal
# http://pymotw.com/2/signal/
# http://docs.python.org/library/signal.html
import signal
import sys
def signal_handler(sgn, frame):
	print('You pressed Ctrl+C!')
	sys.exit(0)

def signal_handler2(sgn, frame):
        print('user!')

signal.signal(signal.SIGINT, signal_handler) # kill -2 <PID>
signal.signal(signal.SIGUSR1, signal_handler2) # kill -10 <PID>

print('Press Ctrl+C')
signal.pause()
