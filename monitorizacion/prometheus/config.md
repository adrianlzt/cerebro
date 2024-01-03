https://prometheus.io/docs/prometheus/latest/configuration/configuration/

Ejemplos:
https://gist.github.com/weibeld/7ccc448a9ea000f23e4b83012671f2d0

scrape_configs:
  - job_name: node
    static_configs:
      - targets:
        - localhost:9100
