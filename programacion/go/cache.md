https://github.com/hashicorp/golang-lru
import lru "github.com/hashicorp/golang-lru"
var gameServerStateLastChange *lru.Cache

lruCache, err := lru.New(120)
if err != nil {
  panic(err)
}

lruCache.Add("key", "value interface")
https://pkg.go.dev/github.com/hashicorp/golang-lru#Cache
Get(...)

## Size
Usando mem pprof en un gotest.

Usando como key y como value int
1Mi elementos (1048576) 142MB Add + 44MB insertValue
2Mi elementos (1048576) 291MB Add + 104MB insertValue


# https://godoc.org/golang.org/x/build/internal/lru


# https://github.com/patrickmn/go-cache

c.Set("foo", "bar", cache.DefaultExpiration)
foo, found := c.Get("foo")
if found {
    fmt.Println(foo)
}



https://github.com/golang/groupcache
Más complejo, sirve para sincronizar variables entre grupos de nodos.



https://github.com/eaigner/last
System memory aware LRU cache in Go
Cantidad de cache limitada por la memoria disponible



https://godoc.org/golang.org/x/sync/singleflight
