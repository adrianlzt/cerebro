sed -i 's/START=no/START=yes/g' /etc/default/logstash
service logstash start

O a mano:
cd /etc/logstash
java -jar logstash.jar agent -f fichero.conf --path.data .

Arrancar con la web y debug
java -jar logstash.jar agent -f fichero.conf --debug -- web
