https://github.com/Xfennec/cv

cv - Coreutils Viewer

Permite ver el progreso de utilidades básicas de linux (cp, mv, dd, tar, gzip/gunzip, cat, ...) 

El binario esta en este directorio compilado en Ubuntu 14.04
Copiar a /usr/local/bin


How does it work ?
It simply scans /proc for interesting commands, and then use fd/ and fdinfo/ directories to find opened files and seek position, and reports status for the biggest file.
It's very light, and compatible with virtually any command.
