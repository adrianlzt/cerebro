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

voltron view command "list" --lexer c
  cada vez que se ejecuta un comando en el debuger, se ejeuta el comando "list" de dicho debugger
  En el caso de gdb, ejecutaremos
  si queremos mostrar mas lineas de codigo, desde gdb haremos: set listsize 20
