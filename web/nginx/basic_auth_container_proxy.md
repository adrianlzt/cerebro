https://hub.docker.com/r/beevelop/nginx-basic-auth

Container para proveer de basic auth a otro container sirviendo http:

docker run -d \
           -e HTPASSWD='foo:$apr1$odHl5EJN$KbxMfo86Qdve2FH4owePn.' \
           -e FORWARD_PORT=1337 \
           --link web:web -p 8080:80 \
           --name auth \
           beevelop/nginx-basic-auth

Para crear la pareja user:pass:
htpasswd -nb usuario contraseña
