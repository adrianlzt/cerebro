El downtime se puede especificar de un start time a un end time, o entre unas horas y con una duración.
En el segundo caso, cuando icinga detecte que el host/service esta down/critical, comenzará a contar el tiempo del downtime.

Se pueden asociar downtimes mediante ids. En cuanto uno de los downtimes salte, el resto de hosts/services se pondrán en downtime.


SCHEDULE_HOST_DOWNTIME

SCHEDULE_HOST_SVC_DOWNTIME

SCHEDULE_HOSTGROUP_HOST_DOWNTIME

SCHEDULE_HOSTGROUP_SVC_DOWNTIME

SCHEDULE_SERVICEGROUP_HOST_DOWNTIME

SCHEDULE_SERVICEGROUP_SVC_DOWNTIME

SCHEDULE_SVC_DOWNTIME


