https://mathias-kettner.de/checkmk_configvars.html

Check_mk tiene varias maneras de meter los resultados pasivos en Icinga:
  - echo "xxx" > .../icinga.cmd
  - escribir en /var/spool/icinga/checkresults
  - gearman (parche, mirar gearman.md)

main.mk
check_submission = 'gearman'
check_submission = 'pipe'
# nagios_command_pipe_path = '/var/run/icinga2/cmd/icinga2.cmd'

Por defecto es 'file' (escribe en check_results/)


Si usamos 'pipe', usará la definida en 
/usr/share/check_mk/modules/defaults
nagios_command_pipe_path

Este valor se puede redifinir en el main.mk


Si modificamos estos valores tendremos que regenerar los python (cmk -U)
