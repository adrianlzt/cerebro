http://docs.ansible.com/uri_module.html

Hacer GET/POST/... a urls

Hace falta tener el paquete httplib2.
Para centos:
- name: httplib2 package is needed to register the host
  yum: name=python-httplib2 state=latest

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
