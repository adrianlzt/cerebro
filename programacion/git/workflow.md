touch README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:dralzt/check_multithreshold.git
git push -u origin master

git co -b develop
git push -u origin develop

git co -b feature/initial_code_import

# Añado el programa, modifico el README.md #
git add *
git cam "First alpha code"
git push -u origin feature/initial_code_import

Desde el interfaz de github, me pongo en la rama develop (https://github.com/dialt/check_multithreshold/tree/develop) y le doy a "Compare & pull request" que me aparece asociado a la nueva rama feature/ que he creado.
Edito este pull request para que sea entre Develop y la rama feature/

Modificamos si queremos el título, y en el texto ponemos LGTM (Looks good to me)
En la siguiente pantalla me lo asigno (boton con un engranaje), y si no hay comentarios que esperar por otra persona, hago "Merge pull request"

Volvemos a la rama develop:
git co develop

Y la actualizamos con los cambios hechos en github
git pull -u origin develop

Si quisieramos añadir otro cambio:
git co -b feature/set_title_in_readme
vi README.md
git cam "Set title in the readme file according to markdown language"
git push -u origin feature/set_title_in_readme

Y desde la interfaz web volvemos a aceptar el pull request que se genera con la nueva rama.
