https://www.elastic.co/guide/en/kibana/current/production.html#load-balancing
Para tener un ES como cliente:
elasticsearch.yml
node.master: false
node.data: false

