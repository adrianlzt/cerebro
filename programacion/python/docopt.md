http://docopt.org/
http://try.docopt.org/
  probar online

docopt helps you:
define interface for your command-line app, and
automatically generate parser for it.

https://github.com/docopt/docopt



Usage:
  naval.py router-list [--co=COSA] <name>

No se puede poner:
  [--co COSA]
  [-c COSA]
  [-c=COSA]

Cuidado con intentar usar una misma 'key' para dos cosas distintas.
Esto NO se puede hacer:
  app alarm-send --status=<status> --message=<message>
  app task-show [--status]

Options:
    --project <project>         Icinga project name
    --days <days>               Number of days to get perfdata [default: 50]
