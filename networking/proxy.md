Para usar un proxy para los comandos:
export http_proxy="http://blabla.com:4534"


Proxy socks, imagen docker:
docker run --rm -it --name socks5-proxy -p 1080:1080 -e PROXY_USER=adri -e PROXY_PASSWORD=adri serjs/go-socks5-proxy
curl --socks5 127.0.0.1:1080 -U adri:adri https://ifcfg.me
