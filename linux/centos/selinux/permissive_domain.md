http://danwalsh.livejournal.com/24537.html
https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security-Enhanced_Linux/sect-Security-Enhanced_Linux-Fixing_Problems-Permissive_Domains.html
https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security-Enhanced_Linux/sect-Security-Enhanced_Linux-Permissive_Domains-Denials_for_Permissive_Domains.html

Permissive domains allow an administrator to configure a single process (domain) to run permissive, rather than making the whole system permissive. SELinux checks are still performed for permissive domains; however, the kernel allows access and reports an AVC denial for situations where SELinux would have denied access.

Making a Domain Permissive
semanage permissive -a httpd_t

list of domains you have made permissive
semodule -l | grep permissive

Quitar dominio permissivo:
semanage permissive -d httpd_t


Ejemplo, el agente zabbix está dando problemas y queremos deshabilitar selinux solo para él.
Buscamos alguna linea de log en el autid.log donde podamos ver el scontext.
Ej.: type=AVC msg=audit(1526998859.669:37871): avc:  denied  { name_connect } for  pid=30019 comm="zabbix_agentd" dest=80 scontext=system_u:system_r:zabbix_agent_t:s0...
Y luego permitimos a ese contexto todo:
semanage permissive -a zabbix_agent_t
