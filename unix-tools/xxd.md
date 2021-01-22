yum install vim-common

Convertir texto plano que representa hexadecimal a hexadecimal.
echo "51" | xxd -r -p
  nos devuelve una Q

echo "515545" | xxd -r -p
  "QUE"



Convertir texto a hex
echo -n QUE | xxd -p
515545


Editor hexadecimal:
xxd $file | vipe | xxd -r | sponge $file



hex to char: rax2 -s 43 4a 50
char to hex: rax2 -S A J A
int to hex: rax2 100
hex to int: rax2 0x1A


Mostrar caracteres en binario:
echo -n ABC | xxd -b

Mostrar el binario 1:
echo -n '\x01' | xxd -b

Interpretar una cadena de texto como un número, nos saca la representación binaria del número que devuelva el cat:
cat /proc/sys/kernel/sysrq | xxd -r -p | xxd -b
