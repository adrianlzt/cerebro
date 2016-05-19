import sys, select, datetime

while True:
    print datetime.datetime.now()
    print "You have two seconds to answer!"
    
    i, o, e = select.select( [sys.stdin], [], [], 2 )
    
    if (i):
      print "You said", sys.stdin.readline().strip()
    else:
      print "You said nothing!"
