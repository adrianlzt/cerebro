https://github.com/stephendotexe/Logstash_kibana_auto_install
http://www.heystephenwood.com/2013/08/auto-install-logstash-and-kibana-on.html

git clone https://github.com/stephendotexe/Logstash_kibana_auto_install.git
cd Logstash_kibana_auto_install/
sudo ./logstash_server
http://ip.addres/

Elasticsearch, logstash, and redis will be listening on their default port. Kibana will be listening on port 80.
I've tested the install on fresh installs of Ubuntu 12.04. In production I am indexing about 800 logs per second and it is handling it quite nicely.


Para Kibana3:
https://github.com/stephendotexe/Logstash1.2_kibana3_auto_install
https://raw.github.com/stephendotexe/Logstash1.2_kibana3_auto_install/master/bootstrap

git clone https://github.com/stephendotexe/Logstash1.2_kibana3_auto_install.git
cd Logstash1.2_kibana3_auto_install/
./bootstrap
http://ip.addres/
Dashboard para logstash: http://10.0.3.12/index.html#/dashboard/file/logstash.json


Este bootstrap te deja una configuración como la que se explica en este documento: http://logstash.net/docs/1.2.2/tutorials/getting-started-centralized

Usa Redis de broker, que después se pasa a elastisearch.

Para enviar logs debemos arrancar otro logstash configurado con (ejemplo para debug):
input {
  stdin {
    type => "example"
  }
}

output {
  stdout { codec => rubydebug }
  redis { host => "127.0.0.1" data_type => "list" key => "logstash" }
}

Y arrancamos el logstash agent con:
java -jar /etc/logstash/logstash.jar agent -f shipper.conf

Lo que escribamos en stdin saldrá reflejado (por el stdout), almacenado en redis (pero será dificil verlo antes de que lo consuma logstash) y consumido por logstash para meterlo en ES.

Mas configuraciones en config.md

