# Override de triggers
Uso el template de linux para los servers, pero para uno determinado quiero que el proc.num sea 1000 en vez de 300.
User macros? https://www.zabbix.com/forum/showthread.php?t=48985


# Dashboard general
Cuando hay un problema, ver rápidamente porqué ha saltado. Valor actual vs trigger. O un acceso más directo al trigger.


# Actuar sobre varias keys simultaneamente
{Escalada:web.test.fail[].last()}=1

Como se podria hacer algo tipo
