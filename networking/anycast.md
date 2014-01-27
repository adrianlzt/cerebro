DNS y los 6to4 relay routers usan anycast.
Comparten la misma ip, y cada uno exporta el prefijo (192.88.99.0/24 porque los grandes routers no cogen prefijos más grandes).
Dependiendo de nuestra localización física, llegaremos a uno u otro servidor.

Esto no se puede generalizar, porque entonces las tablas de los routers explotarían. Habría un monton de empresas exportando pequeños prefijos.

Solo se permite a DNS y los relay routers de 6to4
