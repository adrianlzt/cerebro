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
