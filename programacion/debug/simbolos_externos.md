Si el binario tiene los símbolos en otro fichero, arrancaremos el gdb apuntando al binario, y luego haremos:
(gdb) symbol-file /path/al/fichero.debug

Estos ficheros .debug los instala el rpm -debuginfo-

Tambien se puede hacer para que el binario pille estos ficheros automaticamente:
http://stackoverflow.com/questions/2833084/pointing-symbol-file-folder-for-gdb
http://sourceware.org/gdb/current/onlinedocs/gdb/Separate-Debug-Files.html
