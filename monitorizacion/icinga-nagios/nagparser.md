# PyNag
Python Modules for parsing Nagios configuration and writing plugins
pip install pynag

import pynag.Parsers
retention = pynag.Parsers.retention('retention.dat')
retention.parse()
retention.data.get("service")[0]



# NagParser
https://github.com/zebpalmer/NagParser

A parser for the Nagios status and object cache files to interact with nagios in real time, to get information out of nagios into other project (i.e. dashboards or custom interfaces)


Para parsear un retention.dat parece que no funciona bien

Con python2:
pip install nagparser
python
> import nagparser
> config = nagparser.NagConfig(["retention.dat"])
