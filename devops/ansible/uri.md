http://docs.ansible.com/uri_module.html

Otros modulos
dig: does dns resolution and returns IPs.
get_url: allows pulling data from a url.

Hacer GET/POST/... a urls

Hace falta tener el paquete httplib2.
Para centos:
- name: httplib2 package is needed to register the host
  yum: name=python-httplib2 state=latest

Para ubuntu se llama: python-httplib2

Obtener releases de un repo de github  
tasks:
  - name: ver releases 
    uri: url=https://api.github.com/repos/adrianlzt/pruebas-assets/releases
         HEADER_Authorization="token XXXX"
    register: releases
  - debug: var=releases
  - debug: msg='{{releases.json[0]["url"]}}'
  - debug: msg='{{releases.json[0]["upload_url"]}}'

Crear una release en github
  - uri: url=https://api.github.com/repos/adrianlzt/pruebas-assets/releases
         method=POST
         HEADER_Authorization="token XXXX"
         HEADER_Content-Type="application/json"
         body='{"tag_name":"10.5","name":"vYeahh","body":"Description of the release"}'
         status_code=201
    register: create
  - debug: var=create


dest=FICHERO
  para almacenar el resultado (content) en un fichero


Hacer un post de un fichero (subir una release a github):
  - name: subir release
    command: "curl -H 'Authorization:token {{github_token}}' -H 'Accept:application/vnd.github.manifold-preview' -H 'Content-Type:application/octet-stream' --data-binary @issue.rpm {{var.replace('{?name}','?name=')}}issue.rpm"

# Basic auth
- name: crear database en influxdb
  uri:
    url: "http://localhost:8086/query?q=CREATE%20DATABASE%20nombre"
    method: GET
    force_basic_auth: yes
    user: admin
    password: "lapass"


# urlencode
Si tenemos que pasar algo en la url tendremos que codificarlo:
http://localhost:8086/query?q=CREATE DATABASE nombre
->
http://localhost:8086/query?q=CREATE%20DATABASE%20nombre

Podemos usar tambien
{{variable|urlencode}}
{{variable|urlencode()}}


# Esperar hasta que una url esté disponible
- name: Pause play until a URL is reachable from this host
  uri:
    url: "http://192.0.2.1/some/test"
    follow_redirects: none
    method: GET
  register: _result
  until: _result.status == 200
  retries: 720 # 720 * 5 seconds = 1hour (60*60/5)
  delay: 5 # Every 5 seconds



# Proxy
mirar proxy.md
