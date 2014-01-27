https://code.google.com/p/parallel-ssh/
https://parallel-ssh.googlecode.com/git/doc/pssh-HOWTO.html
Antiguo dev: http://www.theether.org/pssh/
Mirar tambien clush


En Ubuntu:
apt-get install pssh

echo -e "10.0.0.1\n10.0.0.2\n10.0.0.3" > ips
parallel-ssh -h ips -o . comando
Genera ficheros de nombre 10.0.0.1, etc donde dentro se encuentra la respuesta al comando.


Ejecuta el comando 'clustercheck' en los tres nodos y nos devuelve el output (-i).
parallel-ssh -H "comonpercomysql01 comonpercomysql02 comonpercomysql03" -i "clustercheck"


Mas ejemplos en el man.

Y mas comandos relacionados: pscp(1), prsync(1), pslurp(1), pnuke(1)
