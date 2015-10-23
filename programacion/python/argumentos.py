#!/usr/bin/env python
#
# sys.argv[1] primer argumento
#
# $ python argumentos.py 1 2 3
# len(sys.argv) = 4
# arg(0)=argumentos.py
# arg(1)=1
# arg(2)=2
# arg(3)=3
#

import sys

print("len(sys.argv) = %s" % len(sys.argv))

for n in range(0,len(sys.argv)):
    print("arg(%i)=%s" % (n, sys.argv[n]))
