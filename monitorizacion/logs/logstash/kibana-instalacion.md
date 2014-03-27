http://www.elasticsearch.org/overview/kibana/
https://download.elasticsearch.org/kibana/kibana/kibana-3.0.0milestone5.tar.gz

Interfaz gráfica para simplificar la realización de querys complejas.

apt-get install apache2
wget https://download.elasticsearch.org/kibana/kibana/kibana-3.0.0milestone5.tar.gz
tar zxvf kibana-3.0.0milestone5.tar.gz -C /var/www/
vi config.js
  El que viene por defecto nos servirá si tenemos elasticsearch corriendo en el mismo host
  Aunque si está en otro nodo en nuestra misma subred, y tenemos acceso al puerto 9200, detectará automáticamente el nodo elasticsearch

En el directorio app/dashboards tenemos json definiendo los distintos dashbords que podemos usar.
Por defecto usará default.json.
Seguramente queramos tener el dashboard de logstash por defecto (el default.json solo nos muestra unos tips de como usar kibana):
  cp logstash.json default.json
