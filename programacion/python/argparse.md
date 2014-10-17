https://docs.python.org/2.7/library/argparse.html

mirar argh.md

import argparse

# Parse arguments, just config file
parser = argparse.ArgumentParser(prog="cyclops", description='Monitoring as a service')
parser.add_argument("-c", "--config", action="store", dest="input_config_file",
                            help="Path to the cyclops configuration file.", default=None)
args = parser.parse_args()

if args.input_config_file:
    config_file = args.input_config_file
else:
    config_file = "/etc/cyclops_agent.conf"

