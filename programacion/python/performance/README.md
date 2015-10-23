# Resultados de las pruebas de performance

Pruebas realizadas sobre una unidad en memoria (tmpfs)

## Midiendo solo tiempo de búsqueda (string in data)

```
array_1000000.json: 0.168213129044
array_100000.json: 0.0169479846954
array_10000.json: 0.00163316726685
array_1000.json: 0.000166893005371
array_100.json: 2.19345092773e-05

diccionario_1000000.json: 4.05311584473e-06
diccionario_100000.json: 3.09944152832e-06
diccionario_10000.json: 3.09944152832e-06
diccionario_1000.json: 9.53674316406e-07
diccionario_100.json: 9.53674316406e-07

set_array_1000000.json: 5.00679016113e-06
set_array_100000.json: 5.96046447754e-06
set_array_10000.json: 2.86102294922e-06
set_array_1000.json: 9.53674316406e-07
set_array_100.json: 9.53674316406e-07
```

Los diccionarios los mejores -> O(1)

Los sets prácticamente iguales -> O(1)

Los arrays mal -> O(n)


## Comparando entre carga un json y hacer un import
Se mide el tiempo total de ejecucción.

### JSON
```
diccionario_1000000.json: 1.20
diccionario_100000.json: 0.14
diccionario_10000.json: 0.03
diccionario_1000.json: 0.02
diccionario_100.json: 0.02
```

### import
Gran diferencia entre la primera vez que importamos un fichero (no existe su .pyc) y cuando ya existe: 8.3s VS 0.63s

```
diccionario_1000000_json.py: 0.63
diccionario_100000_json.py: 0.07
diccionario_10000_json.py: 0.02
diccionario_1000_json.py: 0.02
diccionario_100_json.py: 0.02
```

#### La variable a cargar es un literal
No hay diferencia entre el literal ('') y el string ("")
