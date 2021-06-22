https://pkg.go.dev/github.com/vishvananda/netns



# Ejecutar algo bajo un namespace de red distinto
https://gist.github.com/adrianlzt/559635c2bd1877734501f90218645425
Copia en ejemplos/exec_other_ns.go


Jugando con gorutinas, si dejo una gorutina sacando el número de interfaces (net.Interfaces) y en la gorutina principal hago un cambio de net ns, la gorutina que saca las interfaces a veces me saca las del ns default y a veces las del ns cambiado.
Mirando con strace parece que esa gorutina que muestras las interfaces va flapeando entre dos threads y cada uno tiene un ns distinto.

Para evitar este problema debemos "lockear" la gorutina a un thread específico de go (visto en https://www.weave.works/blog/linux-namespaces-and-go-don-t-mix):
runtime.LockOSThread()
defer runtime.UnlockOSThread()


CUIDADO!
https://www.weave.works/blog/linux-namespaces-and-go-don-t-mix
Según este artículo, la gestión de threads de Go hace poco fiable el cambiar el namespace de un proceso go.
Discusión sobre el problema: https://news.ycombinator.com/item?id=14470231

Parece que aún usando LockOSThread, si go lo considera necesario, puede levantar otro hilo.
Se solucionó en 1.16.3 https://github.com/golang/go/commit/2595fe7fb6f272f9204ca3ef0b0c55e66fb8d90f

Pero parece que podemos seguir teniendo problemas si no somos cuidadosos.
Si tenemos un programa main, arrancamos una gorutina con lock para obtener los datos con netlink en otro ns, al seguir la rutina main, tal vez sigua en el thread usado para netlink, por lo que estará en el ns cambiado.
Por las pruebas que he echo, parece que usando LockOSThread y devolviendo ese hilo al NS inicial funciona correctamente.
De esta manera logramos que si el thread usado por la gorutina que modificó el namespace se reusa, esta se encuentre en el ns default y no en el modificado.
