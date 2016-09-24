Definir las funciones antes de usarlas.

function kk () {
  echo hola
  return 0
}


# Usar variables locales dentro de las funciones
# Declarar i local si la vamos a usar para un for
function change_owner_of_files() {
    local user=$1; shift
    local group=$1; shift
    local files=$@
    local i

    for i in $files
    do
        chown $user:$group $i
    done
}


Para meterlas en condicionales:
if fun param1 param2; then
  ...

# Return values
http://www.linuxjournal.com/content/return-values-bash-functions

Varias opciones, una sencilla:

function myfunc()
{
    local  myresult='some value'
    echo "$myresult"
}

result=$(myfunc)   # or result=`myfunc`
echo $result


Otro es el codigo de retorno:
function test() {
  if cosa; then
    return 0 # true
  else
    return 1 # false
  fi
}

if test; then # Aqui estamos usando el valor de retorno $? para el if
  echo "test true"
fi
