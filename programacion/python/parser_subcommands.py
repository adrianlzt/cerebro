import argparse

# Subcommands functions. Should be defined before parser
def register(args):
  print "curl POST host " + args.register_host

def deregister(args):
  print "curl DELETE host"

# Parse arguments
parser = argparse.ArgumentParser(prog="cyclops", description='Monitoring as a service')
parser.add_argument("-c", "--config", action="store", dest="input_config_file",
                            help="Path to the cyclops configuration file.", default=None)

subparsers = parser.add_subparsers(title='subcommands', metavar='action')
parser_register = subparsers.add_parser('register', help='register host in Cyclops')
parser_register.set_defaults(func=register) # If subcommand register is called, call function register
parser_register.add_argument('-H','--host', action='store', dest='register_host', help="Hostname to register.", default=None)
# Parameter passed in args param to the register function

parser_deregister = subparsers.add_parser('deregister', help='deregister host from Cyclops')
parser_deregister.set_defaults(func=deregister)

args = parser.parse_args()

if args.input_config_file:
    config_file = args.input_config_file
else:
    config_file = "/etc/cyclops_agent.conf"

args.func(args)
