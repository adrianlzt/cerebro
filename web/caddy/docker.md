https://hub.docker.com/_/caddy

https://github.com/nathan-osman/caddy-docker
https://blog.quickmediasolutions.com/2017/08/23/running-everything-in-docker.html#caddy

Aplicación que incluye caddy como librería de go.
Usada como container, escucha en el proxy de docker y va reconfigurando proxy para dar acceso (proxy inverso) a los contaiers que se vayan levantando con determinadas labels.

docker run --rm -it --name caddy --net host caddy caddy reverse-proxy --from "*:6060" --to localhost:6061
