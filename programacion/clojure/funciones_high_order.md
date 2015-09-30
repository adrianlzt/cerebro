# High-order functions
Estas son funciones que llaman a otras funciones.

(map FUNCION DATOS)
  nos devuelve los datos de aplicar FUNCION a cada DATO de DATOS
  map.md

(filter FUNC DATOS)
  nos devuelve una lista de solo con los DATOS que hayan dado true en la FUNC
  filter.md

(remove FUNC DATOS)
  devuelve DATOS que no cumplan FUNC

(reduce FUNC DATOS)
  aplica FUNC sobre todos los DATOS para devolvernos un único valor

(split-with FUNC DATOS)
  Nos devuelve una secuencia contenida por datos que cumplen la FUNC y los que no.
