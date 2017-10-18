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

npm run watch
  si queremos rebuild del frontend segun hagamos cambios al codigo

bin/grafana-server
bin/grafana-server -config conf/sample.ini

navegador: http://localhost:3000
admin:admin


Si tocamos el código javascript tendremos, grunt se encargará de recompilarlo.
Tendremos que recargar la web
