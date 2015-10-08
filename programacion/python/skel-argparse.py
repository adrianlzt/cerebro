#!/usr/bin/env python

import sys
import argparse
import logging

FORMAT = "[%(levelname)s %(filename)s:%(lineno)s - %(funcName)20s() ] %(message)s"
logging.basicConfig(level=logging.ERROR, format=FORMAT)
logger = logging.getLogger(__name__)


class Main:
    """ might as well use a class. It'll make things easier later. """

    def __init__(self, args=False):
        """ init method, run at class creation """
        self.args = args

    def run(self):
        """ do stuff here """
        logger.info("info-level log message")
        logger.debug("debug-level log message")
        logger.error("error-level log message")
        print("run.")


def parse_args(argv):
    """
    parse arguments/options

    this uses the new argparse module instead of optparse
    see: <https://docs.python.org/2/library/argparse.html>
    """
    p = argparse.ArgumentParser(description='Sample python script skeleton.')
    p.add_argument('-d', '--dry-run', dest='dry_run', action='store_true',
                   default=False,
                   help="dry-run - don't actually make any changes")
    p.add_argument('-v', '--verbose', dest='verbose', action='count', default=0,
                   help='verbose output. specify twice for debug-level output.')
    p.add_argument("-c", "--config", action="store", dest="input_config_file",
                   help="Path to the cyclops configuration file.", default=None)

    args = p.parse_args(argv)

    return args

if __name__ == "__main__":
    args = parse_args(sys.argv[1:])
    if args.verbose > 1:
        logger.setLevel(logging.DEBUG)
    elif args.verbose > 0:
        logger.setLevel(logging.INFO)
    main = Main(args)
    main.run()
