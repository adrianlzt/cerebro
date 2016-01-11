INPUT -> FILTERS -> OUTPUT


# Server flow
https://github.com/elastic/filebeat/issues/132
many Beats ---> Logstash ---> queue (Redis, Kafka, etc.) ---> Logstash ---> Elasticsearch

