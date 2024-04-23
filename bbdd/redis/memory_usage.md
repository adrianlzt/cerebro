# Analisis del espacio consumido por redis

Con el fin de analizar el espacio consumido por redis, se ha utilizado el comando `redis-cli` con el comando `info memory` para obtener la información del espacio consumido por redis.
```bash
$ redis-cli info memory
```

Para analizar que keys están ocupando más espacio en redis, se ha utilizado el comando `redis-cli` con el comando `memory usage` para obtener la información del espacio consumido por cada key.
```bash
$ redis-cli memory usage <key>
```

redis-cli también tiene un comando `--bigkeys` que nos permite obtener las keys que más espacio consumen en redis.
```bash
$ redis-cli --bigkeys
```

Para poder analizar todas las keys y ordenar el top 10, poniendo que key consume y el espacio usado en formato user friendly, se ha utilizado el siguiente comando.
```bash
$ for i in $(redis-cli keys "*"); do echo -n "$i "; redis-cli memory usage $i; done | sort -k2 -n | tail -n 10 | awk '{print $1, $2/1024/1024 "MB"}'
```
