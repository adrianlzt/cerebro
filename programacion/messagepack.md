<http://msgpack.org/>
otra opción: protocol-buffers.md

formato: <https://github.com/msgpack/msgpack/blob/master/spec.md>

Serialización binaria para lograr eficacia.
Permite el intercambio de datos como JSON pero de manera más eficaz.

RT @jespi: "Over half of our analytics CPU power was used up by parsing JSON" @abestanway @jonlives #velocityconf

Si es un dict, empiza por 0x8n, siendo n el número de keys del dict.
Si es una lista, empieza por 0x9n, siendo n la longitud de la lista.

# msgpack-tools

Para convertir entre msgpack y json
Abandonado en 2017. Mirar como hacerlo con python.

Está en AUR:
yay msgpack-tools
Roto (agosto 2024)

Se puede bajar el .deb
