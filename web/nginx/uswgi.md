upstream alarmer {
  least_conn;
  keepalive 32;
  server unix:///tmp/uwsgi.sock;
  server unix:///tmp/uwsgi2.sock;
  server unix:///tmp/uwsgi3.sock;
  server unix:///tmp/uwsgi4.sock;
}

server {
  listen    8003;
  server_name cyclops.net;
  charset   utf-8;

  location /cyclops/v1/projects/ {
    uwsgi_pass alarmer;
    include uwsgi_params;
  }

}
