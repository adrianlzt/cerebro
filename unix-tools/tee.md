ifconfig -234 2>&1 | tee logfile
ifconfig -234 |& tee logfile
Saca por pantalla stdout y sterr. Guarda una copia de todo esto en el fichero "logfile"

Si usamos tee, el RC parece que siempre es RC=0

Si queremos obtener el RC del primer comando:
command | tee file
echo ${PIPESTATUS[0]} # prints the exit code of command


Version para pipes: pee
