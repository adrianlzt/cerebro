mejor usar doctopt.md (externo) o argparse.md (python2.7)

https://docs.python.org/2/library/optparse.html


action="store"
  guarda el valor que le pasemos

action="store_true"
  pone a True la variable si pasan ese parámetro (al contrario con store_false)



Ejemplo para capturar un parametro:
from optparse import OptionParser
parser = OptionParser()
parser.add_option("-f", "--file",
                  action="store", type="string", dest="filename")

args = ["-f", "foo.txt","argumento"]
(options, args) = parser.parse_args(args)

>>> options.filename
'foo.txt'
>>> print(options)
{'filename': 'foo.txt'}
>>> print(args)
['argumento']





Ejemplo:
    from optparse import OptionParser
    parser = OptionParser(
        usage="usage: %prog [ <interval> [ <count> ] ] [ <options> ] [ <mount point> ]",
        description=mydescription,
        version='version %s' % Iostats_version)
    parser.set_defaults(which=0, sort=False, list=sys.maxsize)

    statgroup = OptionGroup(parser, "Statistics Options",
                            'File I/O is displayed unless one of the following is specified:')
    statgroup.add_option('-a', '--attr',
                            action="store_const",
                            dest="which",
                            const=1,
                            help='displays statistics related to the attribute cache')
    parser.add_option_group(statgroup)
    (options, args) = parser.parse_args(sys.argv)



Otro ejemplo con logger, debug, info:

    from optparse import OptionParser
    import sys
    
    import logging
    logger = logging.getLogger(__name__)
    logging.basicConfig()
    logger.setLevel(logging.CRITICAL)
    
    if __name__ == '__main__':
        parser = OptionParser()
        parser.add_option("-v", action="store_true", dest="verbose")
        parser.add_option("-d", action="store_true", dest="debug")
        (options, args) = parser.parse_args(sys.argv)
    
        if options.verbose:
            logger.setLevel(logging.INFO)
            logger.info("Logger set to INFO level")
        if options.debug:
            logger.setLevel(logging.DEBUG)
            logger.info("Logger set to DEBUG level")
    
        print("Starting proxy server")
    
