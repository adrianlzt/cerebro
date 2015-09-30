http://yogthos.github.io/ClojureDistilled.html

Lenguaje funcional VS lenguaje imperativo

Code is data, and data is code.
We can manipulate any piece of Clojure code just like we would any other data structure.

All the expressions are evaluated from the inside out.

In Clojure, there is no distinction between functions and variables. You can assign a function to a label, pass it as a parameter, or return a function from another function. Functions that can be treated as data are referred to as being first-class because they don't have any additional restrictions attached to them.

# Inmutable data
Los datos no se pueden modificar. Se puede aplicar una función y obtener otra copia.
La idea es set stateless. Las funciones cogen datos y devuelven otros, no pueden hacer nada más (no pueden modificar nada del origen, ni el resultado va a variar dependiendo de estados de la app)

# Reusable
Las funciones son stateless así que se pueden usar si problemas.

La diferencia respecto a un lenguaje imperativo sería:
Imperativo:
for (..); cosas con el codigo; end

Funcional:
(bucle, funcion, datos)

# Scalable
La inmutabilidad de las funciones nos ayuda a la escalabilidad.

Mejora el trabajo con locks.
