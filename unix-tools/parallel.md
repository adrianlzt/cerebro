man parallel

ls *.png | parallel convert {} {.}.jpg

Descomprimir muchos rpms en paralelo
ls *.rpm | parallel 'rpm2cpio {} | cpio -id'

Para RedHat poner el parámetro --gnu


# Ejecutar en distintas máquinas
https://datascienceatthecommandline.com/2e/chapter-8-parallel-pipelines.html#distributed-processing

parallel --nonall -S serverA,serverB hostname
