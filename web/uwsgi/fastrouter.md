http://www.codekoala.com/posts/uwsgi-fastrouter-and-nginx/

Es para tener un número dinámico de uwsgi workers.

La idea es tener:
nginx <--> uwsgi fastrouter <--> uwsgi

Los nuevos workers de uwsgi se suscriben al fastrouter y empiezan a ser balanceados automáticamente, sin necesidad de modificar la conf de nginx.
