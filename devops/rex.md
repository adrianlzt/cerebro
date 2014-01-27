http://rexify.org/

Está a medio camino entre parallel-ssh y puppet

rex -H "frontend[01..15] middleware[01..05] db[01..04]" -e "say run 'uptime'"
