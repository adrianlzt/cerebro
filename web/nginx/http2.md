https://www.nginx.com/blog/nginx-1-9-5/

To enable HTTP/2 support, simply add the http2 parameter to all listen directives. Also include the ssl parameter, required because browsers do not support HTTP/2 without encryption.


server {
    listen 443 ssl http2 default_server;
