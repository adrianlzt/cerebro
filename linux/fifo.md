/usr/bin/mkfifo --mode=0666 /tmp/test.fifo

terminal1: tail -f /tmp/test.fifo
terminal2: echo "datos" > /tmp/test.fifo
