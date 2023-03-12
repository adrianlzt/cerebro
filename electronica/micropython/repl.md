# REPL
Para saltar al repl si estamos en la consola con el programa ejecutándose, pulsar
Control+c

# WebREPL
http://micropython.org/webrepl/

## Configurar
import webrepl
webrepl.start(password=REPL_PASSWORD)

La contraseña tiene que ser corta (9 chars), si no falla.


Una vez configurado podemos usar mpfshell para acceder remotamente.


Podemos acceder al repl con github.com/micropython/webrepl
Necesitaremos un navegador.
También hay un script python para subir/bajar ficheros.


Mirar rshell.md para conectar remotamente y copiar ficheros.
Mejor "mpr" (https://github.com/bulletmark/mpr, en AUR)


## Cliente
### Navegador

### CLI
webrepl_shell.py
Para acceder al repl

webrepl_cli.py para subir ficheros (mirar upload_files.md)
