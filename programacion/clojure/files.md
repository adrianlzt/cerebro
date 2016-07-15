http://clojure-doc.org/articles/cookbooks/files_and_directories.html

Read a file into one long string
(def a-long-string (slurp "foo.txt"))

Escribir a fichero:
(spit "fichero.txt" "cosas que guardar")

Añadir:
(spit "foo.txt" "file content" :append true)


Convertir un fichero con estructura de clojure a clojure:
user=> (def laconf (read-string (slurp "prueba.txt")))
#'user/laconf
user=> laconf
[{:name "tools", :id 1} {:name "cb", :id 2}]


$ cat prueba.txt 
[{:name "tools" :id 1}{:name "cb" :id 2}]


Otra forma:
(->> (slurp "prueba.txt") (read-string) (def variable))

El fichero puede ser multilinea y lo entenderá correctamente.




Y a la inversa, guardar en un fichero de texto (no hace falta convertir a string):
user=> (def variable [{:name "dsmctools", :id 1} {:name "ccb", :id 2}])
user=> (spit "spit.txt" variable)
$ cat spit.txt 
[{:name "dsmctools", :id 1} {:name "ccb", :id 2}]
