system("ls")
system.time(expresion en R)  mide el tiempo usado para evaluar esta expresión

Ejecuta el comando "du /tmp/*", la salida estandar la pasa a R (la salida error la saca por pantalla), separa los datos por tabulador, y genera un data.frame con ellos.
read.table(textConnection(system("du /tmp/*", intern=T)),sep='\t')


