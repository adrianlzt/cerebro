Me une la primera linea de un fichero con la primera del otro, y así consecutivamente

cat file1
  1
  2
  3

cat file2
  a
  b
  c

paste file1 file2
  1 a
  2 b
  3 c


ls -1 | paste -sd "," -
  une las lineas por comas


Paste en grupos de 3
echo -e "1\n2\n3\n4\n5" | paste -d ';' - - -
1;2;3
4;5;

Similar
echo -e "1\n2\n3\n4\n5" | paste -sd ';;\n'
1;2;3
4;5

