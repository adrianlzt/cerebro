http://es.wikipedia.org/wiki/Sistema_de_coordenadas_universal_transversal_de_Mercator
https://www.uwgb.edu/dutchs/FieldMethods/UTMSystem.htm

Sistema de coordenadas universal transversal de Mercator

La tierra se trocea en cuadrados (husos) asignándoseles una letra y un número.
Las letras comienzan desde el polo sur (C) hasta el polo norte (X) (se excluyen las letras i y o por su parecido con 1 y 0; las letras de los extremos son para particularidades de los polos)
La primera franja del ecuador hacia el norte es la letra N, por lo tanto tenemos la regla nemotécnica que letras mayor, o igual, que N son latitud norte.
Estas franjas se crean dividiendo cada 8º
A España le corresponden las letras S y T.
En realidad estas letras no corresponden a UTM si no a MGRS (military grid reference system) pero suelen ser usadas.

De este a oeste se divide numéricamente, empezando donde empieza el dia (entre USA y Australia), yedno hacia el Este.
De esta manera el número 3 corresponde a Alaska, a España 29, 30 y 31, Australia 50-56.
Estas divisiones se producen en franjas de 6º.
La franja de 0º a 6ºE corresponde con el número 31

Podemos usar esta herramienta para conocer nuestro huso a partir de la latitud y la longitud: http://www.apsalin.com/utm-zone-finder.aspx


Una coordenada UTM se escribe de la siguiente forma:
30T 456.101 4.447.738

Se pone primero el número y letra de nuestro huso.
Luego la distancia, en metros o km, al meridiano de referencia y por último la distancia en metros al ecuador.

El meridiano de referencia es aquel que pasa por la mitad de nuestro huso.
Por ejemplo, para el huso 31 (entre 0º y 6ºE) el meridiano de referencia es 3ºE
Para el uso 29 (12ºO - 6ºO) es 9ºO
Podemos usar esta herramienta para saber cual es en cada caso: http://www.apsalin.com/utm_central_meridian_lookup.aspx

En UTM no queremos tener números negativos, por lo que al meridiano de referencia se le asigna el valor 500.000 (500km).
Hacia el oeste restaremos metros y hacia el este sumaremos.

Ejemplo: para el uso 30 Bilbao cae prácticamente en longitud 3ºO, por lo que su coordenada será
30T 500000 xxxxxxx

Si nos vamos hacia el este, por ejemplo Huesca, está en 0º24' y le corresponde la coordenada
30T 714000 xxxxxxx

Si nos fuesemos hacia el oeste, por ejemplo León, está en 5º34' y le corresponde la coordenada
30T 290000 xxxxxxx


El número 500.000 se ha elegido para que en el ecuador, donde las franjas de 6º son más anchas, la distancia desde el meridiano de referencia hasta el extremo no supere los 500km y por lo tanto no aparezcan números negativos.
El huso más ancho, en el ecuador, tendrá (40075km / 360) * 6 = 668km
(40075km tiene de perímetro la Tierra)

A la altura de Madrid los husos tienen una anchura de unso 500km
En Tarifa: 540km
En Grenoble: 471km


Respecto a la coordenada norte o Y:
Madrid: 4.478.719
Tarifa: 3.988.037
Santander: 4.812.245
Grenoble: 5.007.628


Si nos encontramos en el hemisferio sur la coordenada Y también crece hacia el norte, siendo el ecuador 10.000.000
Tierra de Fuego (Argentina) 4.042.662
Buenos Aires: 6.178.658
Rio de Janeiro: 7.455.240


Coordenadas la Alameda
30T 450.112 4.478.718
