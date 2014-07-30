Defeating Web Proxies

Sometimes not only does a network provide just web access, but to get even that you have to use a web proxy. Fortunately a program called Corkscrew can send SSH traffic through a web proxy. Corkscrew is really simple to use. Whenever I’ve needed it, I've searched the web for it, downloaded it, followed the instructions on its website, and it’s just worked. You (temporarily) use configuration like this:

ProxyCommand corkscrew proxy.example.com 8080 %h %p


Usar mejor socat
