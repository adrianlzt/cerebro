https://docs.python.org/2/library/shlex.html

The shlex class makes it easy to write lexical analyzers for simple syntaxes resembling that of the Unix shell.

>>> cmd = '/usr/lb45/nagios/plugins/check\ mem.sh -e 3 -s 3 -d /dev/shm'
>>> shlex.split(cmd)
['/usr/lb45/nagios/plugins/check mem.sh', '-e', '3', '-s', '3', '-d', '/dev/shm']

