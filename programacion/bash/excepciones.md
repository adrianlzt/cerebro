Una forma cutre de generar "excepciones" es usar el strict mode y meter lo que puede fallar en una función:

#!/bin/bash
set -e
set -u
set -o pipefail

function send() {
  echo "start send"
  asda34rtxf
  echo "fin send"
}

if send "pepe"; then
  echo "func ok"
else
  echo "func ERROR"
fi
