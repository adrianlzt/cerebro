https://docs.traefik.io/

Træfik (pronounced like traffic) is a modern HTTP reverse proxy and load balancer made to deploy microservices with ease. It supports several backends (Docker, Swarm mode, Kubernetes, Marathon, Consul, Etcd, Rancher, Amazon ECS, and a lot more) to manage its configuration automatically and dynamically.


# config docker
Ejemplo con http y https

defaultEntryPoints = ["http", "https"]
[entryPoints]
    [entryPoints.traefik]
    address = ":8050"
    [entryPoints.http]
    address = ":80"
    [entryPoints.https]
    address = ":443"
      [entryPoints.https.tls]
        [[entryPoints.https.tls.certificates]]
        certFile = "/certs/some.pem"
        keyFile = "/certs/some.key"
[api]
[ping]
[docker]
domain = "some.com"




# exponer un container por traefik
Poner las tags:
traefik.frontend.rule=Host:kibana.some.com,logs.some.com
traefik.port=5601

# Auth basic
Podemos poner este label a un container para tener http auth basic
traefik.frontend.auth.basic.users=EXPR
