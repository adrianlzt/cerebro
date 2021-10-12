http://nginx.org/en/docs/http/ngx_http_log_module.html

Se puede limitar el logging para que no registre peticiones 20x o 30x, pero solo a partir de la version 1.7.0

map $status $loggable {
    ~^[23]  0;
    default 1;
}

access_log /path/to/access.log combined if=$loggable;




Para quitarlo totalmente:
access_log off;



# Log format
http://nginx.org/en/docs/http/ngx_http_log_module.html

Default:	
access_log logs/access.log combined;
log_format combined '$remote_addr - $remote_user [$time_local] '
                    '"$request" $status $body_bytes_sent '
                    '"$http_referer" "$http_user_agent"';


formato con tiempos
log_format time_fmt '$remote_addr - $remote_user [$time_local] '
                    '$ssl_protocol/$ssl_cipher '
                    '"$request" $status $body_bytes_sent '
                    '"$http_referer" "$http_user_agent" "$gzip_ratio" '
                    '$request_time $upstream_connect_time $upstream_header_time $upstream_response_time '
                    '$host $upstream_addr';
