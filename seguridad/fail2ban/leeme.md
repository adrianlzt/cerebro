http://www.fail2ban.org/

Fail2ban scans log files (e.g. /var/log/apache/error_log) and bans IPs that show the malicious signs -- too many password failures, seeking for exploits

Config de ejemplo en iredmail_config


Conceptos:

jail: es la entidad a monitoizar, donde definimos que ficheros chequear, con que reglas y las acciones a tomar.

filter: 	a filter defines a regular expression which must match a pattern corresponding to a log-in failure or any other expression
action: 	an action defines several commands which are executed at different moments
jail: 	a jail is a combination of one filter and one or several actions. Fail2ban can handle several jails at the same time
