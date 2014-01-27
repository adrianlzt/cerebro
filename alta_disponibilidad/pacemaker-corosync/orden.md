Obliga a que el recurso 'virtual_ip' esté ejecutándose antes de iniciar 'webserver'

order apache-after-vip inf: virtual_ip webserver
