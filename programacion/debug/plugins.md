GEF, "superpowers" con python.

https://github.com/jfoote/exploitable/
http://www.cert.org/vulnerability-analysis/tools/triage.cfm
Cuando casca un programa, lo analiza para ver como de importante es el bug, si este podría usarse para comprometer el sistema.


Voltron
https://github.com/snare/voltron
https://github.com/snare/voltron/wiki
yaourt -Ss voltron-git

echo "source /usr/lib/python3.6/site-packages/voltron/entry.py" >> .gdbinit

Para usarlo comenzaremos un debug:
gdb programa

En otras terminales abriremos las ventanas que necesitemos (no veremos nada hasta que el programa este running):
voltron view register
voltron view stack
voltron view memory
voltron view disasm
voltron view backtrace
voltron view breakpoints
