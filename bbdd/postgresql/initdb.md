initdb --locale en_US.UTF-8 -D '/var/lib/postgres/data'

initdb: error: nombre de configuración regional «en_US.UTF-8» no es válido
initdb: error: invalid locale name "en_US.UTF-8"

Arreglar pasando:
--no-locale

O quitando el --locale
