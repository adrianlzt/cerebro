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
