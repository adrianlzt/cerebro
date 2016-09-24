# Redigo
https://github.com/garyburd/redigo
go get github.com/garyburd/redigo/redis

import "github.com/garyburd/redigo/redis"

## Conectar
c, err := redis.Dial("tcp", ":6379")
if err != nil {
    fmt.Println(err.Error())
}
defer c.Close()

## Obtener un array de strings
n, err := redis.Strings(c.Do("SMEMBERS", "notifier-udo:sm2m"))
if err != nil {
    fmt.Println(err.Error())
}




# Redix
https://github.com/mediocregopher/radix.v2
