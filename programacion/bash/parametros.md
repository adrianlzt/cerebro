http://wiki.bash-hackers.org/scripting/posparams

Chequear si el numero de parámetros es correcto:
EXPECTED_ARGS=2
E_BADARGS=65

if [ $# -ne $EXPECTED_ARGS ]
then
  echo "Usage: `basename $0` proyecto password"
  exit $E_BADARGS
fi


./script bla tre
$1 sera bla
$2 tre

$1 ... $9 ${10} ${11} ...
$*	all positional parameters except $0, see mass usage
$@	all positional parameters except $0, see mass usage
$#	the number of arguments, not counting $0


Sobre convertir variables "al vuelo"
http://www.ibm.com/developerworks/opensource/library/l-bash-parameters/index.html
Pattern matching
Default values
