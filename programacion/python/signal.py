#!/usr/bin/env python
# man 7 signal
# http://pymotw.com/2/signal/
# http://docs.python.org/library/signal.html
import signal
import sys
def signal_handler(signal, frame):
	print 'You pressed Ctrl+C!'
	sys.exit(0)
signal.signal(signal.SIGINT, signal_handler)
print 'Press Ctrl+C'
signal.pause()
