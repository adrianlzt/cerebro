man parallel

ls *.png | parallel convert {} {.}.jpg

Descomprimir muchos rpms en paralelo
ls *.rpm | parallel 'rpm2cpio {} | cpio -id'

Para RedHat poner el parámetro --gnu
