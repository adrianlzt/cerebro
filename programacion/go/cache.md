https://github.com/patrickmn/go-cache

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
