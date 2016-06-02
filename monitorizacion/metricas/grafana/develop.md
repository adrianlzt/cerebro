https://github.com/grafana/grafana/#run-from-master

gvm install go1.6.2
gvm use go1.6.2
go get github.com/grafana/grafana
cd $GOPATH/src/github.com/grafana/grafana
go run build.go setup
godep restore
go run build.go build
npm install
sudo npm install -g grunt-cli
grunt
./bin/grafana-server

navegador: http://localhost:3000
admin:admin


Si tocamos el código javascript tendremos, parar el servidor, correr grunt de nuevo y arrancar de nuevo el server.

No he probado si el "bra" que dice la doc soluciona esto.


