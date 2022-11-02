http://wiki.bash-hackers.org/howto/getopts_tutorial

getopts OPTSTRING VARNAME [ARGS...]

OPTSTRING
definimos que esperamos. Si ponemos ":" despues del caracter significa que viene con parámetro
Si ponemos ":" al comienzo, significa silenciar los errores generados por getopts
  Modo verboso
    invalid option	VARNAME is set to ? (quersion-mark) and OPTARG is unset
    required argument not found	VARNAME is set to ? (quersion-mark), OPTARG is unset and an error message is printed
  Silent mode
    invalid option	VARNAME is set to ? (question-mark) and OPTARG is set to the (invalid) option character
    required argument not found	VARNAME is set to : (colon) and OPTARG contains the option-character in question

El modo silent mola mas, ya que nos permite sacar un error nuestro en caso de que falte un parámetro


Para algo tipo: ./programa -xr -t bla -e ble
Sería: getopts "xrt:e:" VAR

En $VAR ira el parámetro ('t', 'x', o lo que toque)

En $OPTARG ira el valor del parámetro ("bla" para el param 't')


Podemos usar getopts para pasar parámetros que no sea $@ (los parámetros al llamar al programa)
while getopts :f:h opt "${MY_OWN_SET[@]}"; do

Ejemplo de como lo hace hblock:
https://github.com/hectorm/hblock/blob/ac1f78d9d9ad4c642d49ce60eee6adc5392b3ea8/hblock#L98

Ejemplo:

while getopts ":ht:v" OPTION
do
  case $OPTION in
    h)
      help
      exit 1
      ;;
    t)
      TEST=$OPTARG
      ;;
    v)
      VERBOSE=1
      ;;

    \?)
      help
      exit 1
      ;;

    :)
      echo "Option -$OPTARG requires an argument." >&2
      help
      exit 1
      ;;

    *)
      # Should not occur
      echo "Unknown error while processing options" >&2
      exit 1
      ;;
  esac
done
