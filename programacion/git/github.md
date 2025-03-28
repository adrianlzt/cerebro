Chuleta de Markdown: <https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet>

<https://help.github.com/articles/fork-a-repo>
Fork:
Podemos utilizarlo para contribuir a un proyecto, o para usarlo como base para uno nuestro.

En la web del proyecto que queramos, pulsamos en Fork. Nos copiará el repo a nuestra cuenta.
Nos bajamos el repo a local con git clone.

Asignamos el remote original:
git remote add upstream <https://github.com/octocat/Spoon-Knife.git>

Hacer cambios y subirlos a mi repo (como siempre)
...
git push origin master

Obtener cambios del upstream:
git fetch upstream
Y unirlos con mi código
git merge upstream/master

# Bajar una PR de un repo remoto

git remote add upstream <https://github.com/opensourcehacker/sevabot.git>
git fetch upstream pull/72/head:fix_68_missing_messages
git branch -la

<https://help.github.com/articles/using-pull-requests>
Git pull request: hacer cambios en mi fork y enviarselos a la rama principal

Me creo una nueva branch y hago los cambios en ella:
git co -b nombreBranch
...
git commit...

La subo a github
git pull -all

En la web de github me sale la opción de Pull Request

Subcribirse a un proyecto para ser sus actualizaciones (ATOM a sus tags)
<https://github.com/USUARIO/PROYECTO/tags.atom>
Enviarme los updates al correo: <https://blogtrottr.com>

Página web en github: adrianlzt.github.io
<http://pages.github.com/>
<https://help.github.com/articles/creating-project-pages-manually>

Usar el generador automático: <https://help.github.com/articles/creating-pages-with-the-automatic-generator>

# Web de usuario (usa rama master)

Creo un nuevo repo NOMBREUSER.github.io.
Lo bajo a mi pc: git clone <git@github.com>:adrianlzt/adrianlzt.github.io.git
echo "My GitHub Page" > index.html
git add index.html
git commit -a -m "First pages commit"
git push origin master

# Web de proyecto (usa rama gh-pages)

Bajo a mi pc el repo del proyecto: git clone <git@github.com>:adrianlzt/
git checkout --orphan gh-pages
echo "My GitHub Page" > index.html
git add index.html
git commit -a -m "First pages commit"
git push origin gh-pages

Le meto google analytics: <https://www.google.com/analytics>

Hooks: por cada commit se llama a una url
Lo más básico es un webhook que hace un post con un json como payload. <https://help.github.com/articles/post-receive-hooks>
Luego hay muchos para apps determinadas. Settings -> Service Hooks

Analytics para github: <https://bitdeli.com/>

Poner enlaces a imágenes de servicios rollo travis-ci
![CodeShip](https://www.codeship.io/projects/9ae74330-8697-0131-49f1-3e77f06cd138/status)

## Integraciones

<https://github.com/integrations>

## Comparaciones

<https://github.com/adrianlzt/puppet-monitoring-ui/compare/develop%40%7B1day%7D...develop>
En una de las ramas se puede poner: develop@{3day}

## Token

<https://github.com/settings/applications>
"Generate new token"

# Bajar directorio de un repo

Primero chequear lo que queremos:
svn ls <https://web.com/repo/trunk/src/templates/project.template>

Luego bajar
svn export <https://web.com/TDAF/repo/trunk/src/templates/project.template>

# Actions / CI/

# self-hosted runner

<https://docs.github.com/en/actions/hosting-your-own-runners>

## Usar un contenedor de docker para correr el runner

<https://github.com/myoung34/docker-github-actions-runner>

Este usa docker-in-docker, montando el docker.sock

El oficial, pero usa sysbox en vez de docker:
<https://github.com/docker/github-actions-runner>

## Simular ejecución en local

<https://blog.harshcasper.com/debugging-github-actions-workflows-effectively>

Arch linux: aur/act

Ver jobs:
act -l

Ejecutar:
act
act -j UNSOLOJOB

# LLM model marketplace

<https://github.com/marketplace/models>

Podemos usar github como un marketplace para modelos de lenguaje de distintas compañias.

Con una cuenta de github te da acceso a todos los modelos con ciertos límites de uso.

Por debajo usa la API de inferencia de azure: <https://github.com/marketplace/models/azureml-mistral/Ministral-3B/playground/code>

Las limitaciones que ponen parece que es por modelo: <https://docs.github.com/en/github-models/prototyping-with-ai-models#rate-limits>

Por lo que podríamos hacer 15 llamadas en un minuto a un modelo low y en el mismo minuto otras 15 a otro modelo low.

Parece que estos límites no son los que tiene github copilot usado como extensión.
He probado a usar el marketplace para llamar a o1-preview y veo la limitación de 1/minuto.
Mientras tanto, usando CodeCompletion he podido hacer un par de llamadas a o1-preview.
