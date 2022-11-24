http://honeyco.nyc/blog/running-nginx-in-the-foreground/
http://nginx.org/en/docs/faq/daemon_master_process_off.html

nginx.conf
daemon off;

nginx -g "daemon off;"
