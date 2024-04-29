https://localtunnel.github.io/www/

Instalar:
npm install -g localtunnel

Uso:
lt --port 9090
http://wbcjegcrvh.localtunnel.me

lt --port 443 --local-https true --allow-invalid-cert
exponer un endpoint https

Hace un tunnel http

Nos permite solicitar un subdominio determinado
lt -s foobar -p 8000


Exponer el puerto 3001
La primera vez que entremos nos redirige a una web de localtunnel donde tenemos que poner la ip pública del server que expone.
Parece que solo lo solicita una vez por ip.
docker run --rm -it --net host tvranjes/localtunnel lt --port 443
