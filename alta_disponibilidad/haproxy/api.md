https://www.haproxy.com/blog/dynamic-configuration-haproxy-runtime-api/

# Conectar
$ socat readline /var/run/hapee-lb.sock
$ socat readline tcp4-connect:127.0.0.1:9999

$ echo "help" | socat stdio /var/run/hapee-lb.sock
$ echo "help" | socat stdio tcp4-connect:127.0.0.1:9999


# Comandos
help

## Stats
show stat


## Parar servers
Drain traffic (se siguen enviando los health checks)
set server be_app/webserv1 state drain
set server be_app/webserv1 state maint
  asi evitamos enviar los health checks

Allow server to accept traffic again
set server be_app/webserv1 state ready


## Health checks
Dejar de enviar health checks (y reactivar):
disable health be_app/webserv1
enable health be_app/webserv1


## Weights
Change weight by percentage of its original value
set server be_app/webserv1 weight 50%

Change weight in proportion to other servers
set server be_app/webserv1 weight 100


## Frontend
Activar/desactivar:
disable frontend fe_main
enable frontend fe_main

Tambien podemos cambiar su maxconn, etc


## Stick tables
List the contents of the stick table
show table ft_web

Set an entry's GPT0 value to 0
set table ft_web key 127.0.0.1 data.gpt0 0

Delete the entry
clear table ft_web key 127.0.0.1

Verify successful deletion
show table ft_web

List remaining blocked client IPs (those with tag GPT0 value greater than 0)
show table ft_web data.gpt0 gt 0


## ACL
show acl

We are interested in the 5th ACL (ID #4)
Display the ACL's current settings
show acl #4

Add a new rate of 60
add acl #4 60

Verify that both values are now present
show acl #4

Delete the old value in any of the following two ways - by value, or by using the reference number
del acl #4 10

Verify that only one value now remains in effect
show acl #4


## Errores
show errors


## Sesiones
show sess

Cerrar sesión
shutdown session ID
