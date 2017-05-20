oc proxy -h

Meter un proxy delante de la API



# Configurar la plataforma si tenemos que salir a internet por un proxy
Los nodos apps necesitan acceso a internet para bajar imágenes del router y del registry
https://docs.openshift.com/container-platform/3.5/install_config/http_proxies.html

Deberemos meter las variables
HTTP_PROXY
HTTPS_PROXY
NO_PROXY

en los ficheros /etc/sysconfig/atomic* y /etc/sysconfig/docker

NO_PROXY deberá contener los dominios de la plataforma, las ips y las del SDN (los pods)



# Definir proxy en un template (para su conex con git)
source:
  type: Git
  git:
    uri: https://github.com/openshift/ruby-hello-world
    httpProxy: http://proxy.example.com
    httpsProxy: https://proxy.example.com
    noProxy: somedomain.com, otherdomain.com
