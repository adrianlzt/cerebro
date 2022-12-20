http://www.zytrax.com/books/dns/ch7/acl.html

Nos sirve para definir ips para luego definir que pueden, o no pueden hacer.



Ejemplo:

acl internal {
        192.168.1.0/24;
        localhost;
        localnets;
};

options {
        allow-query     { internal; };
}


Con esta opción permitimos a ese rango de ips y las redes locales hacer queries.


# allow-query
allow-query defines an match list of IP address(es) which are allowed to issue queries to the server. If not specified all hosts are allowed to make queries (defaults to allow-query {any;};).


