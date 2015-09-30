map is a higher order function, which means that it takes another function as an argument. For example, you can ask map to increment each number in a vector by passing it the inc function, followed by the vector.

(map FUNCION DATOS)
  nos devuelve los datos de aplicar FUNCION a cada DATO de DATOS


Nos devuelve un vector sumando +1 a cada uno de los elementos.
(map inc [1 2 3])

(map #(* % %) [1 2 3 4 5]) => (1 4 9 16 25)
