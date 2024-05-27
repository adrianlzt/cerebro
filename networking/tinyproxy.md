https://tinyproxy.github.io/

Proxy http

sudo tinyproxy -d
  en foreground

docker run --rm -it -p 8888:8888 vimagick/tinyproxy

curl --proxy localhost:8888 eth0.me


Montar el proxy en una maquina que no tiene salida a internet:
ssh -f -R 8888:localhost:8888 maquina -NT
maquina> curl --proxy localhost:8888 eth0.me
