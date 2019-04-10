No hay /proc

Usamos comandos para obtener esos valores:

pmap, pfiles — displays process address information and open file descriptors
ptree — prints the process tree hierarchy
ps — report process status
  https://docstore.mik.ua/manuals/hp-ux/en/B2355-60130/ps.1.html

ps -ef

ps de UNIX (hay que poner la variable de entorno para activarlo)
UNIX95=t ps -eo pid,pcpu,comm
