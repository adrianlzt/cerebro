https://caddyserver.com/docs/caddyfile

Si el formato es json, tiene que tener la extensión .json

El formato más potente es usar .json

El formato "Caddyfile" es el más sencillo y el que se usa por defecto, pero menos expresivo.

Podemos convertir un Caddyfile a json con:
caddy adapt --config Caddyfile --pretty --validate > Caddyfile.json

No se puede convertir de json a Cadddyfile.
https://caddy.community/t/adapter-json-to-caddyfile/12772/2

Validar
caddy validate --config caddy.json
