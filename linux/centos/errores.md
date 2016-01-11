https://access.redhat.com/solutions/19327?tour=6

'kernel: audit: backlog limit exceeded' messages in /var/log/messages

Ejemplo:
kernel: audit: audit_backlog=65537 > audit_backlog_limit=65536
kernel: audit: audit_lost=126533574 audit_rate_limit=0 audit_backlog_limit=65536


Audit se queda sin memoria.
Subir el valor:
/etc/audit/audit.rules:
# Increase the buffers to survive stress events.
# Make this bigger for busy systems
-b 320

service auditd restart

Subir este valor aumenta el consumo de memoria.

También podemos hacer que los logs se sincronicen con el disco directamente:
/etc/audit/auditd.conf
flush = SYNC

