Para monitorizar las trazas que genera icinga2 debemos ignorar algunas que se producen al reiniciar el master:
[2017-04-22 10:34:19 -0500] warning/TlsStream: TLS stream was disconnected.
[2017-04-22 10:34:19 -0500] warning/JsonRpcConnection: API client disconnected for identity 'controller'
[2017-04-22 10:34:19 -0500] warning/ApiListener: Removing API client for endpoint 'controller'. 0 API clients left.




Trazas que si he encontrado importantes:

[2017-04-22 10:27:53 -0500]  warning/ApiListener: Ignoring config update for unknown zone 'director-global'

[2017-04-22 10:39:11 -0500] warning/PluginCheckTask: Check command for object 'app1' (PID: 16267, arguments: '/usr/lib64/nagios/plugins/check_logfiles.pl' '--criticalpattern' 'critical' '--logfile' '/var/log/icinga2/icinga2.log' '--nocase' '--sticky' '3600' '--warningpattern' 'warning') terminated with exit code 128, output: execvpe(/usr/lib64/nagios/plugins/check_logfiles.pl) failed: No such file or directory
