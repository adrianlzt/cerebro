http://httpd.apache.org/docs/current/mod/mod_log_config.html#logformat
http://httpd.apache.org/docs/current/mod/mod_log_config.html#formats

Formato para poner tambien el tiempo de procesado de cada solicitud:
LogFormat "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\" REQTIME=%Dus" combined


%D The time taken to serve the request, in microseconds.
http://stackoverflow.com/questions/4735032/d-field-in-apache-access-logs-first-or-last-byte

https://github.com/apache/httpd/blob/2.2.14/modules/loggers/mod_log_config.c#L623
read_request_line()
  r->request_time = apr_time_now();

log_request_duration_microseconds
  apr_time_now() - r->request_time)

El valor es el tiempo desde que se lee la petición hasta que se envía el último byte.
https://github.com/apache/httpd/blob/2.2.14/modules/http/http_request.c#L308
aqui terminaria la petición y se pasaria al handler del log que va a escrir el tiempo



Hay otra función, ap_time_process_request, que mide solo el tiempo en procesar la respuesta. Parece que es lo que saca en la pagina del mod_status cuando está en modo avanzado



