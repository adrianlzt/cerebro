http://clojure.org/special_forms#Special Forms--(loop [bindings* ] exprs*)


# Ejemplo 1
user=> 
(loop [contador 3 suma 1]
  (if (zero? contador)
    (printf "fin: %d" suma)
    (recur (dec contador) (* suma contador))))
fin: 6nil


loop [condiciones iniciales] funciones
(recur param1 param2)
  llama a loop con unos nuevos parametros

En las condiciones iniciales definimos:
  contador=3
  suma=1

En las funciones hacemos
  if contador==0
    printf "fin="+suma
  else
    recur (contador-1) (suma*contador)

La función recur llama al loop con unos nuevos parámetros.


# Ejemplo 2
(loop [[n & numbers] [1 2 3 4 5]
       result []]
  (let [result (conj result (* n n))]
    (if numbers
      (recur numbers result)
      result)))

Primera vuelta:
Inicialización de las variables:
n=1
numbers=(2 3 4 5)
result=[]

añadir a result: n*n
numbers=(2 3 4 5)

Segunda vuelta:
Inicialización de las variables:
n=2
numbers=(3 4 5)

añadir a result: n*n
...

Cuando (if numbers ya no tenga contenido nos devolverá result
