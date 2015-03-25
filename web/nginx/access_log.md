http://nginx.org/en/docs/http/ngx_http_log_module.html

Se puede limitar el logging para que no registre peticiones 20x o 30x, pero solo a partir de la version 1.7.0

map $status $loggable {
    ~^[23]  0;
    default 1;
}

access_log /path/to/access.log combined if=$loggable;




Para quitarlo totalmente:
access_log off;
