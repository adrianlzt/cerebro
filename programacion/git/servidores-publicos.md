Github
Solo ofrece repositorios públicos

Gittoriuos


Bitbucket
Ofrece repositorios privados, con un límite de 5 usuarios
Cuidado al importar la clave, que no haya cambios de línea debido al copy&paste.


Mi propio servidor
Para tener un servidor que funcione como github o bitbucket
En el servidor:
	$ git init
	$ git config --bool core.bare true

En el cliente (añadir remote a un repo):
	$ git init && git add . && git commit -m "initial commit"
	$ git remote add origin ssh://ncer@sun:/home/repositorios/nuevo/

Otra forma (clonar repo):
  git clone adrian@localhost:/home/adrian/Documentos/prueba
  cd prueba



mkdir dir.git/
git --bare init dir.git/



# docker
https://hub.docker.com/r/ephillipe/gitserver-http/

mkdir repositories
docker run -d -v `pwd`/repositories:/var/lib/git -p "8080:80" cirocosta/gitserver-http
cd repositories
git init --bare repos/myrepo.git

git clone http://localhost:8080/repos/myrepo.git
solo permisos de lectura

Pero donde este el /repositories puedo usar el remote como local:
git remote add local /home/pepe/repositories
