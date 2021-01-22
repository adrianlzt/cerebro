No tiene -A / -B

Opciones:
https://community.hpe.com/t5/languages-and-scripting/grep-for-string-but-include-lines-above-and-below/m-p/3703431#M249759


Equivalente con sed a "-A 1 -B 1"
cat fichero | sed -n -e '/regexp/{=;x;1!p;g;$!N;p;D;}' -e h
Saca también unos números, con el número de match

