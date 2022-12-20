Comparación
https://www.flagship.io/git-branching-strategies/


# Gitflow
https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow
https://nvie.com/posts/a-successful-git-branching-model/
  artículo original

Esquema que se debería seguir con git a la hora de programar, ramas, tags, releases, etc.

Ya no está "de moda".
Problemático para integrar con CI/CD.
Más orientado a un desarrollo largo donde el objetivo es una release en un momento determinado.

Rama develop donde se realiza el desarrollo a base de mergear ramas feature.
Para sacar nuevas versiones se lleva el código de develop a una rama release para luego llevarlo a la rama main.
Lo que hay en main es lo que tenemos en prod.
También tenemos ramas hotfix, para arreglar problemas directamente en la rama main.


# GitHub flow
https://docs.github.com/en/get-started/quickstart/github-flow
https://scottchacon.com/2011/08/31/github-flow.html

Más orientado a desplegar de forma contínua.
Para cuando no necesitamos mantener varias versiones.
Hace falta testear las ramas para ver que funcionan, porque si mergeamos ya llega a master.

Tenemos una rama main.
De ahí se sacan ramas con nombres descriptivos.
Una vez tenemos terminada la rama, se crea una PR contra main.
Cuando se mergea, se despliega.



# GitLab flow
Una rama main para el entorno de staging.
Luego una rama por cada entorno, preprod y prod, por ejemplo.
Al llevarnos commits de una rama a otra es cuando vamos desplegando el código en esos distintos entornos.

Duda: como controlamos que lo desplegado en prod es lo mismo que noprod?
Porque si disparamos builds a partir de commits, estaremos haciendo dos builds distintos (aunque del mismo código).
Pero podrían ser distintos, por el tiempo en el que se resolvieron las dependencias, por ejemplo.



# Trunk based
https://www.flagship.io/glossary/trunk-based-development/
https://trunkbaseddevelopment.com/
https://alanmasciangelo.github.io/posts/seeking-ci-with-gitlab-helm-and-monorepos


# Feature flags
https://www.flagship.io/feature-flags/
Es una forma de meter código nuevo pero sin que se use en producción.
Podemos, por ejemplo, desarollar una nueva funcionalidad, pero que solo será activada cuando el fichero de configuración tenga cierta "flag" activa.

Feature flags help decouple deployment from release so any changes that are not ready can be wrapped in a feature flag and kept hidden while features that are complete can be released to end-users without delay.



# Ejemplo básico gitflow
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
