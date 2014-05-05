http://man7.org/linux/man-pages/man5/proc.5.html
https://www.kernel.org/doc/Documentation/filesystems/proc.txt


## /proc/stat
http://man7.org/linux/man-pages/man5/proc.5.html
Sección /proc/[pid]/stat
Para sacar un campo sin perderse (en el man viene entre parentesis el número de campo que es): 
cat stat | cut -d' ' -f 18  (ejemplo para sacar el priority)

user time y systime mirar time.md
