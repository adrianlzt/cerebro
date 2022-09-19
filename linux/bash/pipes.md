Cerrar pipes:
comando 1>&- 2>&-


stderr a stdout
comando >&


Subshell que actua como un fichero.
El contenido entre paréntesis será como si fuera el contenido de un fichero
$ cat <(echo "hola")
hola

$ cat $(echo "hola")
cat: hola: No existe el fichero o el directorio



Reenviar stdout + stderr a otro comando
lshw |& grep xxx


Reenviar el pipe a dos comandos (funciona por que el head solo consume la primera línea y deja el resto para grep):
➜ ps -eo comm,rss  | {head -1 ; grep skydive}
COMMAND           RSS
skydive         196940


Para reenviar a varias pipes (https://superuser.com/a/7458):
tee >(proc1) >(proc2) >(proc3) | proc4

Ejemplo que he usado:
echo '{}' | cfssl selfsign localhost - 2>/dev/null | tee >(jq -r '.cert' > cert.pem) >(jq -r '.key' > key.pem)
