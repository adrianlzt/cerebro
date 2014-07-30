http://redsymbol.net/articles/bash-exit-traps/

#!/bin/bash
scratch=$(mktemp -d -t tmp.XXXXXXXXXX)
function finish {
  rm -rf "$scratch"
}
trap finish EXIT
