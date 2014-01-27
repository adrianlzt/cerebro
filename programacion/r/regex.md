Pattern Matching and Replacement
?grep
?sub


grep('.*abc.*',var$col)  devuelve la posición donde se ha hecho match
grep('.*abc.*',var$col,v=T)  devuelve la cadena que ha hecho match
grep('.*abc.*',var$col,invert=t)  devuelve la posición donde NO se ha hecho match

Si var es un factor, podemos hacer
var[grep('.*ab.*',var$col),]  y tendremos las filas que hacen match ".*abc.*" en la columa col de var.
