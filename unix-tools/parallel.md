man parallel

ls *.png | parallel convert {} {.}.jpg

Descomprimir muchos rpms en paralelo
ls *.rpm | parallel 'rpm2cpio {} | cpio -id'

Para RedHat poner el parámetro --gnu

-j N
para definir cuantas jobs


Ejemplo indexando un mdjson en elastic con 10 peticiones en paralelo
```
cat hosts_25032022.json | parallel -v -j 10 curl https://es.europe-west3.gcp.cloud.es.io:9243/events_25032022/_doc -v -u elastic:elastic -d "{}" -H Content-Type:application/json
```


# Ejecutar en distintas máquinas
https://datascienceatthecommandline.com/2e/chapter-8-parallel-pipelines.html#distributed-processing

parallel --nonall -S serverA,serverB hostname
