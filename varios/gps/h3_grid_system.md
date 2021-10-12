https://h3geo.org/

Sistema de división del espacio basado en hexágonos.

# Resolución
https://h3geo.org/docs/core-library/restable

11 -> 2149.6 m²
12 -> 307.1 m²
13 -> 43.9 m²
14 -> 6.3 m²
15 -> 0.9 m²

# python
https://h3geo.org/docs/installation
pip install h3

>>> import h3
>>> h3.geo_to_h3(40,5,9)
'89394e7a5c7ffff'

Límites del hexágono:
h3.h3_to_geo_boundary('89394e7a5c7ffff')
((40.00118439224494, 4.997325962516848), (39.99935886462493, 4.997597752654245), (39.99871157824452, 4.9997656413110825), (39.9998898230014, 5.00166182912286), (40.00171538184409, 5.001390113222321), (40.00236266470791, 4.999222135270628))

