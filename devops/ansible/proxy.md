- name: usando proxy
  uri:
    url: http://eth0.me
  environment:
    http_proxy: http://localhost:8090
    https_proxy: http://localhost:8090
