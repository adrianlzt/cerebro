# Borrados lentos
Hacer un explain para ver que está haciendo.
Tiene claves foreign con cascade on delete? Esto hace que tenga que buscarse esa key de unión entre las tablas.
Si esa key no es índice en la segunda tabla esto puede ralentizar mucho el borrado.
