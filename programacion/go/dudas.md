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
