#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""docopt-cli.py

Client script using docopt library.

Usage:
  docopt-cli.py [options] <command> [<args>...]

Commands:
  action1                   explanation of action1
  action2                   explanation of action2
  action3                   explanation of action3

General options:
  -h --help                 show help message and exit
  --version                 show version and exit
  -v --verbose              print status messages

See docopt-cli.py <command> --help for more information on a specific command.
"""

import sys
try:
    from docopt import docopt
except ImportError:
    print "docopt module has to be installed"
    sys.exit(1)


__version__ = '0.1'
DEBUG = False


################################################################################
#
class Client(object):
    """
    A client which executes some docopt.
    """

    def __init__(self):
        pass

    ############################################################################
    #
    def action1(self, args):
        """
Explanation of action1

Usage:
  docopt-cli.py action1 <required_arg>
        """
        if DEBUG:
            print "Execute action1 with theses args:\n", args

    ############################################################################
    #
    def action2(self, args):
        """
Explanation of action2

Usage:
  docopt-cli.py action2 <required_arg> [--optional_arg]

Options:
  --optional_arg        explanation of optionnal_arg
        """
        if DEBUG:
            print "Execute action2 with these args:\n", args

    ############################################################################
    #
    def action3(self, args):
        """
Explanation of action3

Usage:
  docopt-cli.py action3 [--optional_arg1 | --optional_arg2]
  docopt-cli.py action3 [--optional_arg3=<arg3>] [--optional_arg1 | --optional_arg2]

Options:
  --optional_arg1        explanation of optionnal_arg1
  --optional_arg2        explanation of optionnal_arg2
  --optional_arg3        explanation of optionnal_arg3 which takes a required arg3
        """
        if DEBUG:
            print "Execute action3 with these args:\n", args


################################################################################
#
def _execute_cmd(method, args):
    """
    Execute command
    """
    method(args)


def main():
    """
    Create a client, parse the arguments received on the command line and call
    the appropriate method.
    """
    args = docopt(__doc__, version=__version__, options_first=True)

    # set debug mode
    if args['--verbose']:
        global DEBUG
        DEBUG = True

    cli = Client()

    cmd = args['<command>']

    # test if method exists
    if hasattr(cli, cmd):
        method = getattr(cli, cmd)
    else:
        print "This command '%s' doesn't exist, try `%s --help`" % (cmd, sys.argv[0])
        sys.exit(1)

    # re-parse docopt with the relevant docstring from name of cmd
    docstring = method.__doc__.strip()
    if 'Usage:' in docstring:
        args.update(docopt(docstring, argv=sys.argv[sys.argv.index(cmd):]))

    # execute the command
    _execute_cmd(method, args)

if __name__ == '__main__':
    main()
    sys.exit(0)
