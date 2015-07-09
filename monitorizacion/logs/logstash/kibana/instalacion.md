Usar docker



git clone https://github.com/elastic/kibana.git
cd kibana
npm install -g grunt-cli bower
vi package.json 
  postinstall, quitar lo de grunt para chequear licencias
npm install && bower install

bin/kibana.js -c config/kibana.yml

# version desarrollo
grunt dev
