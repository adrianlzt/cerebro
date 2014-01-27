Chuleta de Markdown: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet


https://help.github.com/articles/fork-a-repo
Fork:
Podemos utilizarlo para contribuir a un proyecto, o para usarlo como base para uno nuestro.

En la web del proyecto que queramos, pulsamos en Fork. Nos copiará el repo a nuestra cuenta.
Nos bajamos el repo a local con git clone.

Asignamos el remote original: 
git remote add upstream https://github.com/octocat/Spoon-Knife.git

Hacer cambios y subirlos a mi repo (como siempre)
...
git push origin master

Obtener cambios del upstream:
git fetch upstream
Y unirlos con mi código
git merge upstream/master



https://help.github.com/articles/using-pull-requests
Git pull request: hacer cambios en mi fork y enviarselos a la rama principal

Me creo una nueva branch y hago los cambios en ella:
git co -b nombreBranch
...
git commit...

La subo a github
git pull -all

En la web de github me sale la opción de Pull Request


Subcribirse a un proyecto para ser sus actualizaciones (ATOM a sus tags)
https://github.com/USUARIO/PROYECTO/tags.atom
Enviarme los updates al correo: https://blogtrottr.com


Página web en github: adrianlzt.github.io
http://pages.github.com/
https://help.github.com/articles/creating-project-pages-manually

Usar el generador automático: https://help.github.com/articles/creating-pages-with-the-automatic-generator

# Web de usuario (usa rama master)
Creo un nuevo repo NOMBREUSER.github.io.
Lo bajo a mi pc: git clone git@github.com:adrianlzt/adrianlzt.github.io.git
echo "My GitHub Page" > index.html
git add index.html
git commit -a -m "First pages commit"
git push origin master

# Web de proyecto (usa rama gh-pages)
Bajo a mi pc el repo del proyecto: git clone git@github.com:adrianlzt/
git checkout --orphan gh-pages
echo "My GitHub Page" > index.html
git add index.html
git commit -a -m "First pages commit"
git push origin gh-pages

Le meto google analytics: https://www.google.com/analytics



Hooks: por cada commit se llama a una url
Lo más básico es un webhook que hace un post con un json como payload. https://help.github.com/articles/post-receive-hooks
Luego hay muchos para apps determinadas. Settings -> Service Hooks




Analytics para github: https://bitdeli.com/
