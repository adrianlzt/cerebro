#!/usr/bin/env python
#http://www.ibm.com/developerworks/aix/library/au-pythocli/
import optparse
		 
def main():
  p = optparse.OptionParser()
  p.add_option('--person', '-p', default="world")
  options, arguments = p.parse_args()
  print 'Hello %s' % options.person
         
if __name__ == '__main__':
  main()
