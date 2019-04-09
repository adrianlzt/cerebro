Donde poner las constantes de un pkg?
constants.go?

Que es mejor, llamar a una lib y pasarle el objecto que necesita:
funcion(objecto) {
  x = objecto.bla()
  print(x)
}
O usar una interfaz:
(o objecto) function () {
  x = o.bla()
  print(x)
}
?


En cobra, si dos subcomandos tienen los mismos parámetros, y estamos definiendo las variables en el fichero como "var xxx mmm", fallará si intentamos definir dos veces la misma.
Que hacer? Nombres distintos es lo más evidente, pero, se podría definir las variables localmente para ese fichero? O en el init() para que solo valgan para ese fichero?



En cobra, cuando tenemos un initConfig() que usan varios subcomandos.
Hacer una variable "config" compartida a nivel pkg que inicializa initConfig(*someCfg).
O mejor hacer:
  config := initConfig(*someCfg)

initConfig() debe devolver una var o un puntero?



Si estoy inicializando un array de structs, ejemplo:
for i := 0; i < NumberOfPhilos; i++ {
  philos[i] = Philo{i, NumberOfMeals, &chopsticks[i], &chopsticks[(i+1)%NumberOfPhilos]}
}
La variable i no me está dejando el valor que tiene en cada vuelta, si no que al final todos los Philo acaban con el valor de la i al terminar el bucle.
Usar un constructor?
Si uso un constructor, no me queda otra que cambiar el tipo de philos a []*Philos, no?
func NewPhilo(Id int, leftCS *Chopstick, rightCS *Chopstick) *Philo {
  return &Philo{i, NumberOfMeals, leftCS, rightCS}
}


Si estoy usando una func init() donde quiero inicializar un array que he definido en una var global, no me queda otra que redifinir el tipo?
Si tengo que cambiar el tipo de dato me toca hacerlo dos veces. O usar append?
var philos []Philo
...
func init() {
  philos = make([]Philo, NumberOfPhilos)
}



concurrencia, que es mejor hacer:
go funcion(foo, bar, canal, wg)

O
go func(foo x, bar y, canal chan x) {
  defer wg.Done()
  funcion(foo, bar, canal)
}



Que tamaño darle a un channel si no sabemos cuantos datos tendremos?
Problema por dejar el generador parado hasta que se consuman los datos?
Visto en la función de telegraf-redis donde me pasan métricas y yo las paso en chunks por un canal. De que tamaño hacer ese canal?



Manejo de errores, que es mejor, crear unas const con los errores o unos struct que cumplan la interfaz Error() (mirar errores.md)




https://github.com/adrianlzt/go-zabbix/blob/master/zabbix.go#L166
Como gestionar el retorno de parámetros si estamos haciendo dos cosas al mismo tiempo?



Borrado de un slice
Cada cierto tiempo recorro un slice de structs para ver que elementos debo borrar (están marcados un un parámetro del slice).
Como borrarlos de forma eficiente y sin poder dejar cosas sin recoger por el garbage collector?
https://play.golang.com/p/7UrizCZu-AP
Como puedo saber que no me estoy dejando cosas que no pueden ser recogidas por el GC?
