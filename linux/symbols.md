http://stackoverflow.com/questions/1379533/how-can-i-see-symbols-of-c-and-c-binary-on-linux
Para ver los "symbols" de un binario:

nm -an programa
  nm - list symbols from object files


readelf -Ws programa

nm -D fichero

objdump -d -l programa
