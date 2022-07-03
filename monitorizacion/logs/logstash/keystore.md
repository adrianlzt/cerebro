https://www.elastic.co/guide/en/logstash/current/keystore.html

export LOGSTASH_KEYSTORE_PASS=mypassword
bin/logstash-keystore create

bin/logstash-keystore add ingestor
Nos preguntará por la password que asociar a esa key

