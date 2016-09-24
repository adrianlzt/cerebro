http://clojure-doc.org/articles/tutorials/getting_started.html

Gestor de proyectos clojure

# Instalar
## Arch
yaourt -S aur/leiningen

# Crear un proyecto
lein new app NOMBRE
cd NOMBRE
lein run

Podemos desarrollar de manera interactiva, abriendo el repl, modificando el core.clj y llamando a la función main para ver los cambios.
> (-main)


# Dependencias
Modificamos :dependencies en project.clj

Para bajarlas:
lein deps
