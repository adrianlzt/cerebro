https://docs.docker.com/docker-hub/builds/#create-an-automated-build
http://blog.docker.io/2013/11/introducing-trusted-builds/

Relacionar proyecto en github con index.docker.io
Con un hook, cuando hagamos un commit, se genera de nuevo la imagen en el index.


Tenemos que crear el repo desde hub.docker y apuntar a nuestro repo.
En Build Settings podemos configurar para que haga uso de las tags.
Cada tag de git taggeara una version de la imagen.


La gente suele ponerse unos badges:
![nginx 1.13.0](https://img.shields.io/badge/nginx-1.13.0-brightgreen.svg) ![License MIT](https://img.shields.io/badge/license-MIT-blue.svg) [![Build Status](https://travis-ci.org/jwilder/nginx-proxy.svg?branch=master)](https://travis-ci.org/jwilder/nginx-proxy) [![](https://img.shields.io/docker/stars/jwilder/nginx-proxy.svg)](https://hub.docker.com/r/jwilder/nginx-proxy 'DockerHub') [![](https://img.shields.io/docker/pulls/jwilder/nginx-proxy.svg)](https://hub.docker.com/r/jwilder/nginx-proxy 'DockerHub')
