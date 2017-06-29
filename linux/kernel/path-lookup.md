https://www.kernel.org/doc/Documentation/filesystems/path-lookup.txt

Explicación de como se consigue un fichero a partir de un path.


# Dcache / dentry cache / Directory entry cache
La información de los dentries se almacena en una cache para tener rápidos accesos en posteriores consultas.
Esta tabla se organiza en "buckets", cuya clave es una operación hash sobre la tupla (parent, name).
Una vez se llega hasta el bucket, este contiene una lista enlazada que se recorre entera comparando los elementos completamente hasta encontrar el que buscamos.

Un intento de abrir un fichero que no existe también genera una entrada en la dcache.
