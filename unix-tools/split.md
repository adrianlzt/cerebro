split -b 1G verylargefile split 
# Split a file called largefile into 1 gigabyte pieces called split-xaa, split-xab, split-xac

split -l 4 file
  divide file en ficheros de 4 lineas

csplit
como split pero permite regex

Partir un fichero cada vez que encuentre una expresión regular, en tantos cachos como sea posible (ficheros xxNNN):
csplit -n 3 skydive_fatal_trace.txt /goroutine/ '{*}'
