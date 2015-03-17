yum install vim-common

Convertir texto plano que representa hexadecimal a hexadecimal.
echo "51" | xxd -r -p
  nos devuelve una Q

echo "515545" | xxd -r -p
  "QUE"



Convertir texto a hex
echo -n QUE | xxd -p
515545
