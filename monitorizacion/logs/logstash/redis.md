DEPRECATED
https://github.com/elastic/filebeat/issues/132


The server keeps logs in a redis queue until the logs can be drained into elasticsearch. Neither redis nor elasticsearch are required to be on the server, but they are nevertheless required and installed here.

Permite configurar varios servers:
["127.0.0.1", "127.0.0.2"]

Output hacia redis:

output {
  redis {
    host => "172.16.1.32"
    key => "logstash"
    data_type => "list"
  }
}

En el server redis:
# redis-cli
127.0.0.1:6379> keys *
1) "logstash"
127.0.0.1:6379> TYPE logstash
list
127.0.0.1:6379> LRANGE logstash 0 0
1) "{\"message\":\"peito grillo es un mamon\",\"@version\":\"1\",\"@timestamp\":\"2015-06-09T10:50:10.875Z\",\"file\":\"-\",\"host\":\"manager\",\"offset\":\"0\",\"type\":\"stdin\"}"

