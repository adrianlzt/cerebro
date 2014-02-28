Desde la rama develop creamos ramas para añadir features, que luego mergeamos a la rama develop:

git checkout develop
git pull origin develop # Actualizamos nuestra develop local 
git checkout -b feature/* # Crearemos la rama feature/* y nos trasladaremos a ella. 
git push origin feature/* # Escribiremos en el repositorio remoto _origin_ la nueva rama recién creada.

Cuando se quiera mergear con la rama develop, se realizará un pull request (desde la interfaz web) hacía la rama develop.
En los comentarios se podrá realizar una discusión previa a aceptar el pull request.
Mediante "LGTM" (Looks good to me) se mostrará aceptación.


Crear versiones.
git tag -a x.y.z/CC -m "X.Y.Z: Code complete"
Y crearemos la rama release correspondiente:
git checkout -b release/x.y.z
Esta rama se usará para testear la versión, y crear ramas bugfixes en caso de ser necesario.

Dede las ramas releases, tras alcanzar el último hito de estabilidad se hará pull request a la rama master.


