https://github.com/grafana/grafana/#run-from-master


gvm install go1.7
gvm use go1.7
go get -u github.com/grafana/grafana
cd $GOPATH/src/github.com/grafana/grafana
go run build.go setup
go run build.go build

usar nvm con node 6.9.2
sudo npm install -g yarn
yarn install --pure-lockfile
npm run build
docker run --rm -it -v "$PWD:/mnt" -w /mnt node:6 npm run build
  con docker, por si no tenemos el node 6.9.2

go run build.go package
  deberia hacer los packages, pero si hemos usado docker para node ahora no coincidira la version y no nos dejara. Mirar más abajo la seccion package

npm run watch
  si queremos rebuild del frontend segun hagamos cambios al codigo

bin/grafana-server
bin/grafana-server -config conf/sample.ini

navegador: http://localhost:3000
admin:admin


Si tocamos el código javascript tendremos, grunt se encargará de recompilarlo.
Tendremos que recargar la web



# Hacer build/package
git clone git@github.com:grafana/grafana-packer.git
cd grafana-packer
./local_test.sh
