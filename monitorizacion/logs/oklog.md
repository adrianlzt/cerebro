https://github.com/oklog/oklog

Solución como Elastic Search más simple pero menos potente.


You may consider OK Log if...

You're tailing your logs manually, find it annoying, and want to aggregate them without a lot of fuss
You're using a hosted solution like Loggly, and want to move logs on-prem
You're using Elasticsearch, but find it unreliable, difficult to operate, or don't use many of its features
You're using a custom log pipeline with e.g. Fluentd or Logstash, and having performance problems
You just wanna, like, grep your logs — why is this all so complicated?


$ oklog ingeststore -store.segment-replication-factor 1
$ ./myservice | oklog forward localhost
$ oklog query -from 5m -q Hello
2017-01-01 12:34:56 Hello world!

