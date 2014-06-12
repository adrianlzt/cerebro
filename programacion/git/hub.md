https://github.com/github/hub/
http://hub.github.com/
http://hub.github.com/hub.1.html

git + hub = github
hub is a command line tool that wraps git in order to extend it with extra features and commands that make working with GitHub easier.

## Instalación ##
gem install hub
sudo hub hub standalone | tee /usr/local/bin/hub >& /dev/null && chmod +x /usr/local/bin/hub
echo 'eval "$(hub alias -s)"' >> ~/.bash_aliases
sudo curl https://raw.githubusercontent.com/github/hub/master/etc/hub.bash_completion.sh  -o /etc/bash_completion.d/hub
La primera vez que lo ejecutemos nos pedirá nuestras credenciales que almacenará en ~/.config/hub

## Comandos ##
mkdir REPO; cd REPO; git this; git create; git browse
  Crear un nuevo repo git y crearlo también en github

Ciclo de un pull-request y merge:
git co -b feature/MEJORA
git add ...; git commit ...
git push origin feature/MEJORA
URL=$(echo -e "titulo\n\ncuerpo" | git pull-request -F -)
git co develop
git merge $URL
git push


git compare FICHERO
git compare 1.0..1.1
  Nos abre una ventana de github para comparar el fichero entre distintas ramas

$ git browse
> open https://github.com/YOUR_USER/CURRENT_REPO

$ git browse REPO pulls
> open https://github.com/YOUR_USER/REPO/pulls


$ git init -g
> git init
> git remote add origin git@github.com:YOUR_USER/REPO.git
