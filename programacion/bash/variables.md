GLOBALES: declaradas al comienzo del programa
declare -r PI=3.14
readonly PI=3.14

LOCALES: Declaradas dentro de las funciones
declare -i i
local i

Si hacemos
local var=$(cmd)
la variable $? siempre será 0


Usar declare para definir las variables http://www.tldp.org/LDP/abs/html/declareref.html
-r readonly
-i integer
-a array
-f function(s)
-x export
-x var=$value

Entrecomillar todas las variables:
dir="/path/to/directory/with a space/"
cd $dir #NO funciona
cd "$dir" #SI funciona


VAR=cosa
echo $VAR

Para asignarle el resultado de un comando:
VAR=$(ifconfig)
 
ENTRE LA VARIABLE Y EL IGUAL NO PUEDE HABER ESPACIOS

Asignar variables en bash
export VAR=cosa

En sh
VAR=cosa
export VAR


## Parameter expansion
https://pubs.opengroup.org/onlinepubs/009604499/utilities/xcu_chap02.html

Definir valor por defecto:
echo "para que nunca salga null la variable: ${variable:-valorDefault}"

${parameter:-word}
If parameter is unset or null, the expansion of word is substituted. Otherwise, the value of parameter is substituted.
  ${$(echo ""):-valorDefault}
  ejecuta el comando 'echo ""', como es vacío, devuelve "valorDefault"
${parameter:=word}
If parameter is unset or null, the expansion of word is assigned to parameter. The value of parameter is then substituted. Positional parameters and special parameters may not be assigned to in this way.
${parameter:?word}
If parameter is null or unset, the expansion of word (or a message to that effect if word is not present) is written to the standard error and the shell, if it is not interactive, exits. Otherwise, the value of parameter is substituted.

${parameter:+word}
If parameter is null or unset, nothing is substituted, otherwise the expansion of word is substituted.
${tags:+--tags "$tags"}
Nos apañde el prefijo "--tags" si $tags está definida.

Variable en mayusculas:
"${y^^}"

Variable en minusculas:
"${y,,}"

Quitar a partir del último caracter hacia el final
```
echo ${$(echo 6.6.2_foo-3)%_*}
6.6.2
```


${SERVICE/A/B}
Cambia la primera A por B

${SERVICE//A/B}
Cambia todas las A por B

Cambia todas las barras "/" por "_"
SERVICE=${SERVICE//\//_}

Cambiar la primera barra "/" por "_"
SERVICE=${SERVICE/\//_}

Quitar los dos últimos caracteres que son "ol"
var=capol; echo ${var%ol}
cap

Quitar los tres primeros caracteres:
var=miercoles; echo ${var#mie}
rcoles



Mas acciones con las variables según si están definidas o no:
http://www.debuntu.org/how-to-bash-parameter-expansion-and-default-values/


Concatenar:
foo="Hello"
foo="$foo World"
echo $foo


eval $( cat /proc/sys/net/ipv4/ip_local_port_range | awk '{printf "MAX_PORTS=%d", $2-$1;}')
El cat+awk me generan "MAX_PORTS=232322", que usando $() y eval termino teniendo definida la variable MAX_PORTS con ese valor.
