numero=${1:-3}
divisor=${2:-2}

if [[ $(( $numero % $divisor )) -eq 0 ]];  then
  echo "$numero multiplo de $divisor"
else
  echo "$numero no es multiplo de $divisor"
fi
