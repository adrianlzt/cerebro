Usar el nuevo formato:
http://mywiki.wooledge.org/BashFAQ/031

Multiples condiciones:
if [[ $var = img* && ($var = *.png || $var = *.jpg) ]]; then
	echo "$var starts with img and ends with .jpg or .png"
elif [[ 1 == 1 ]]; then
  echo "elif"
fi

if [[ $VAR ]]; then
  echo "var definida"
else
  echo "var no definida"
fi

grep $1 /etc/passwd
if [[ $? -eq 0 ]]; then
  echo "encontrado"
else
  echo "not match"
fi

grep $1 /etc/passwd
if [[ $? -ne 0 ]]; then
  echo "not match"
fi

# Regexp
if [[ "hola" =~ ^h.l[aA] ]]; then echo "match"; fi



FORMATO ANTIGUO:
Comprobar si una variable ha sido definida:
id=$(cmd);
if [ -n "$id" ]; then
        echo "id=$id"
else   
        echo "no definida"
fi

Comprobar si dos cadenas con iguales:
if [ $var = "cosa" ]; then
	echo "iguales"
fi


Mejor crear funciones con nombre para sabe que hacemos:
is_empty() {
    local var=$1

    [[ -z $var ]]
}

is_not_empty() {
    local var=$1

    [[ -n $var ]]
}

is_file() {
    local file=$1

    [[ -f $file ]]
}

is_dir() {
    local dir=$1

    [[ -d $dir ]]
}

if [[ -d /ttmp ]]; then 
  echo "existe"
else 
  echo "NO existe"
fi

Para meterlas en condicionales:
if fun param1 param2; then
  ...

