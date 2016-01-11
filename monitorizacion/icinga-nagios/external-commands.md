http://docs.icinga.org/latest/en/extcommands2.html

http://old.nagios.org/developerinfo/externalcommands/commandlist.php


ACKNOWLEDGE_SVC_PROBLEM 
If the "sticky" option is set to two (2), the acknowledgement will remain until the service returns to an OK state. Otherwise the acknowledgement will automatically be removed when the service changes state

If the "notify" option is set to one (1), a notification will be sent out to contacts indicating that the current service problem has been acknowledged. 

If the "persistent" option is set to one (1), the comment associated with the acknowledgement will survive across restarts of the Nagios process. If not, the comment will be deleted the next time Nagios restarts.


Para enviar un external command:
external-command.sh


/usr/bin/printf "[%lu] SCHEDULE_SVC_CHECK;HOSTNAME;Check load by NRPE;$(date +%s)\n" $(date +%s) > /var/spool/icinga/cmd/icinga.cmd



Total comandos: 162

# Comandos sin parametros (30)
DISABLE_EVENT_HANDLERS
DISABLE_FAILURE_PREDICTION
DISABLE_FLAP_DETECTION
DISABLE_HOST_FRESHNESS_CHECKS
DISABLE_NOTIFICATIONS
DISABLE_PERFORMANCE_DATA
DISABLE_SERVICE_FRESHNESS_CHECKS
ENABLE_EVENT_HANDLERS
ENABLE_FAILURE_PREDICTION
ENABLE_FLAP_DETECTION
ENABLE_HOST_FRESHNESS_CHECKS
ENABLE_NOTIFICATIONS
ENABLE_PERFORMANCE_DATA
ENABLE_SERVICE_FRESHNESS_CHECKS
READ_STATE_INFORMATION
RESTART_PROCESS
SAVE_STATE_INFORMATION
SHUTDOWN_PROCESS
START_ACCEPTING_PASSIVE_HOST_CHECKS
START_ACCEPTING_PASSIVE_SVC_CHECKS
START_EXECUTING_HOST_CHECKS
START_EXECUTING_SVC_CHECKS
START_OBSESSING_OVER_HOST_CHECKS
START_OBSESSING_OVER_SVC_CHECKS
STOP_ACCEPTING_PASSIVE_HOST_CHECKS
STOP_ACCEPTING_PASSIVE_SVC_CHECKS
STOP_EXECUTING_HOST_CHECKS
STOP_EXECUTING_SVC_CHECKS
STOP_OBSESSING_OVER_HOST_CHECKS
STOP_OBSESSING_OVER_SVC_CHECKS


# Comandos con parametros (132)
# 80 con host_name
# 
ACKNOWLEDGE_HOST_PROBLEM;<host_name>;<sticky>;<notify>;<persistent>;<author>;<comment>
ACKNOWLEDGE_HOST_PROBLEM_EXPIRE;<host_name>;<sticky>;<notify>;<persistent>;<timestamp>;<author>;<comment>
ACKNOWLEDGE_SVC_PROBLEM;<host_name>;<service_description>;<sticky>;<notify>;<persistent>;<author>;<comment>
ACKNOWLEDGE_SVC_PROBLEM_EXPIRE;<host_name>;<service_description>;<sticky>;<notify>;<persistent>;<timestamp>;<author>;<comment>
ADD_HOST_COMMENT;<host_name>;<persistent>;<author>;<comment>
ADD_SVC_COMMENT;<host_name>;<service_description>;<persistent>;<author>;<comment>
CHANGE_CONTACT_HOST_NOTIFICATION_TIMEPERIOD;<contact_name>;<notification_timeperiod>
CHANGE_CONTACT_MODATTR;<contact_name>;<value>
CHANGE_CONTACT_MODHATTR;<contact_name>;<value>
CHANGE_CONTACT_MODSATTR;<contact_name>;<value>
CHANGE_CONTACT_SVC_NOTIFICATION_TIMEPERIOD;<contact_name>;<notification_timeperiod>
CHANGE_CUSTOM_CONTACT_VAR;<contact_name>;<varname>;<varvalue>
CHANGE_CUSTOM_HOST_VAR;<host_name>;<varname>;<varvalue>
CHANGE_CUSTOM_SVC_VAR;<host_name>;<service_description>;<varname>;<varvalue>
CHANGE_GLOBAL_HOST_EVENT_HANDLER;<event_handler_command>
CHANGE_GLOBAL_SVC_EVENT_HANDLER;<event_handler_command>
CHANGE_HOST_CHECK_COMMAND;<host_name>;<check_command>
CHANGE_HOST_CHECK_TIMEPERIOD;<host_name>;<timeperiod>
CHANGE_HOST_EVENT_HANDLER;<host_name>;<event_handler_command>
CHANGE_HOST_MODATTR;<host_name>;<value>
CHANGE_HOST_NOTIFICATION_TIMEPERIOD;<host_name>;<notification_timeperiod>
CHANGE_MAX_HOST_CHECK_ATTEMPTS;<host_name>;<check_attempts>
CHANGE_MAX_SVC_CHECK_ATTEMPTS;<host_name>;<service_description>;<check_attempts>
CHANGE_NORMAL_HOST_CHECK_INTERVAL;<host_name>;<check_interval>
CHANGE_NORMAL_SVC_CHECK_INTERVAL;<host_name>;<service_description>;<check_interval>
CHANGE_RETRY_HOST_CHECK_INTERVAL;<host_name>;<check_interval>
CHANGE_RETRY_SVC_CHECK_INTERVAL;<host_name>;<service_description>;<check_interval>
CHANGE_SVC_CHECK_COMMAND;<host_name>;<service_description>;<check_command>
CHANGE_SVC_CHECK_TIMEPERIOD;<host_name>;<service_description>;<check_timeperiod>
CHANGE_SVC_EVENT_HANDLER;<host_name>;<service_description>;<event_handler_command>
CHANGE_SVC_MODATTR;<host_name>;<service_description>;<value>
CHANGE_SVC_NOTIFICATION_TIMEPERIOD;<host_name>;<service_description>;<notification_timeperiod>
DEL_ALL_HOST_COMMENTS;<host_name>
DEL_ALL_SVC_COMMENTS;<host_name>;<service_description>
DEL_HOST_COMMENT;<comment_id>
DEL_DOWNTIME_BY_HOST_NAME;<host_name>[;<servicedesc>[;<starttime>[;<commentstring>]]]
DEL_DOWNTIME_BY_HOSTGROUP_NAME;<hostgroup_name>[;<hostname>[;<servicedesc>[;<starttime>[;<commentstring>]]]]
DEL_DOWNTIME_BY_START_TIME_COMMENT;<start time[;comment_string]>
DEL_HOST_DOWNTIME;<downtime_id>
DEL_SVC_COMMENT;<comment_id>
DEL_SVC_DOWNTIME;<downtime_id>
DELAY_HOST_NOTIFICATION;<host_name>;<notification_time>
DELAY_SVC_NOTIFICATION;<host_name>;<service_description>;<notification_time>
DISABLE_ALL_NOTIFICATIONS_BEYOND_HOST;<host_name>
DISABLE_CONTACT_HOST_NOTIFICATIONS;<contact_name>
DISABLE_CONTACT_SVC_NOTIFICATIONS;<contact_name>
DISABLE_CONTACTGROUP_HOST_NOTIFICATIONS;<contactgroup_name>
DISABLE_CONTACTGROUP_SVC_NOTIFICATIONS;<contactgroup_name>
DISABLE_HOST_AND_CHILD_NOTIFICATIONS;<host_name>
DISABLE_HOST_CHECK;<host_name>
DISABLE_HOST_EVENT_HANDLER;<host_name>
DISABLE_HOST_FLAP_DETECTION;<host_name>
DISABLE_HOST_NOTIFICATIONS;<host_name>
DISABLE_HOST_SVC_CHECKS;<host_name>
DISABLE_HOST_SVC_NOTIFICATIONS;<host_name>
DISABLE_HOSTGROUP_HOST_CHECKS;<hostgroup_name>
DISABLE_HOSTGROUP_HOST_NOTIFICATIONS;<hostgroup_name>
DISABLE_HOSTGROUP_PASSIVE_HOST_CHECKS;<hostgroup_name>
DISABLE_HOSTGROUP_PASSIVE_SVC_CHECKS;<hostgroup_name>
DISABLE_HOSTGROUP_SVC_CHECKS;<hostgroup_name>
DISABLE_HOSTGROUP_SVC_NOTIFICATIONS;<hostgroup_name>
DISABLE_NOTIFICATIONS_EXPIRE_TIME;<schedule_time>;<expire_time>
DISABLE_PASSIVE_HOST_CHECKS;<host_name>
DISABLE_PASSIVE_SVC_CHECKS;<host_name>;<service_description>
DISABLE_SERVICEGROUP_HOST_CHECKS;<servicegroup_name>
DISABLE_SERVICEGROUP_HOST_NOTIFICATIONS;<servicegroup_name>
DISABLE_SERVICEGROUP_PASSIVE_HOST_CHECKS;<servicegroup_name>
DISABLE_SERVICEGROUP_PASSIVE_SVC_CHECKS;<servicegroup_name>
DISABLE_SERVICEGROUP_SVC_CHECKS;<servicegroup_name>
DISABLE_SERVICEGROUP_SVC_NOTIFICATIONS;<servicegroup_name>
DISABLE_SVC_CHECK;<host_name>;<service_description>
DISABLE_SVC_EVENT_HANDLER;<host_name>;<service_description>
DISABLE_SVC_FLAP_DETECTION;<host_name>;<service_description>
DISABLE_SVC_NOTIFICATIONS;<host_name>;<service_description>
ENABLE_ALL_NOTIFICATIONS_BEYOND_HOST;<host_name>
ENABLE_CONTACT_HOST_NOTIFICATIONS;<contact_name>
ENABLE_CONTACT_SVC_NOTIFICATIONS;<contact_name>
ENABLE_CONTACTGROUP_HOST_NOTIFICATIONS;<contactgroup_name>
ENABLE_CONTACTGROUP_SVC_NOTIFICATIONS;<contactgroup_name>
ENABLE_HOST_AND_CHILD_NOTIFICATIONS;<host_name>
ENABLE_HOST_CHECK;<host_name>
ENABLE_HOST_EVENT_HANDLER;<host_name>
ENABLE_HOST_FLAP_DETECTION;<host_name>
ENABLE_HOST_NOTIFICATIONS;<host_name>
ENABLE_HOST_SVC_CHECKS;<host_name>
ENABLE_HOST_SVC_NOTIFICATIONS;<host_name>
ENABLE_HOSTGROUP_HOST_CHECKS;<hostgroup_name>
ENABLE_HOSTGROUP_HOST_NOTIFICATIONS;<hostgroup_name>
ENABLE_HOSTGROUP_PASSIVE_HOST_CHECKS;<hostgroup_name>
ENABLE_HOSTGROUP_PASSIVE_SVC_CHECKS;<hostgroup_name>
ENABLE_HOSTGROUP_SVC_CHECKS;<hostgroup_name>
ENABLE_HOSTGROUP_SVC_NOTIFICATIONS;<hostgroup_name>
ENABLE_PASSIVE_HOST_CHECKS;<host_name>
ENABLE_PASSIVE_SVC_CHECKS;<host_name>;<service_description>
ENABLE_SERVICEGROUP_HOST_CHECKS;<servicegroup_name>
ENABLE_SERVICEGROUP_HOST_NOTIFICATIONS;<servicegroup_name>
ENABLE_SERVICEGROUP_PASSIVE_HOST_CHECKS;<servicegroup_name>
ENABLE_SERVICEGROUP_PASSIVE_SVC_CHECKS;<servicegroup_name>
ENABLE_SERVICEGROUP_SVC_CHECKS;<servicegroup_name>
ENABLE_SERVICEGROUP_SVC_NOTIFICATIONS;<servicegroup_name>
ENABLE_SVC_CHECK;<host_name>;<service_description>
ENABLE_SVC_EVENT_HANDLER;<host_name>;<service_description>
ENABLE_SVC_FLAP_DETECTION;<host_name>;<service_description>
ENABLE_SVC_NOTIFICATIONS;<host_name>;<service_description>
PROCESS_FILE;<file_name>;<delete>
PROCESS_HOST_CHECK_RESULT;<host_name>;<status_code>;<plugin_output>
PROCESS_SERVICE_CHECK_RESULT;<host_name>;<service_description>;<return_code>;<plugin_output>
REMOVE_HOST_ACKNOWLEDGEMENT;<host_name>
REMOVE_SVC_ACKNOWLEDGEMENT;<host_name>;<service_description>
SCHEDULE_AND_PROPAGATE_HOST_DOWNTIME;<host_name>;<start_time>;<end_time>;<fixed>;<trigger_id>;<duration>;<author>;<comment>
SCHEDULE_AND_PROPAGATE_TRIGGERED_HOST_DOWNTIME;<host_name>;<start_time>;<end_time>;<fixed>;<trigger_id>;<duration>;<author>;<comment>
SCHEDULE_FORCED_HOST_CHECK;<host_name>;<check_time>
SCHEDULE_FORCED_HOST_SVC_CHECKS;<host_name>;<check_time>
SCHEDULE_FORCED_SVC_CHECK;<host_name>;<service_description>;<check_time>
SCHEDULE_HOST_CHECK;<host_name>;<check_time>
SCHEDULE_HOST_DOWNTIME;<host_name>;<start_time>;<end_time>;<fixed>;<trigger_id>;<duration>;<author>;<comment>
SCHEDULE_HOST_SVC_CHECKS;<host_name>;<check_time>
SCHEDULE_HOST_SVC_DOWNTIME;<host_name>;<start_time>;<end_time>;<fixed>;<trigger_id>;<duration>;<author>;<comment>
SCHEDULE_HOSTGROUP_HOST_DOWNTIME;<hostgroup_name>;<start_time>;<end_time>;<fixed>;<trigger_id>;<duration>;<author>;<comment>
SCHEDULE_HOSTGROUP_SVC_DOWNTIME;<hostgroup_name>;<start_time>;<end_time>;<fixed>;<trigger_id>;<duration>;<author>;<comment>
SCHEDULE_SERVICEGROUP_HOST_DOWNTIME;<servicegroup_name>;<start_time>;<end_time>;<fixed>;<trigger_id>;<duration>;<author>;<comment>
SCHEDULE_SERVICEGROUP_SVC_DOWNTIME;<servicegroup_name>;<start_time>;<end_time>;<fixed>;<trigger_id>;<duration>;<author>;<comment>
SCHEDULE_SVC_CHECK;<host_name>;<service_description>;<check_time>
SCHEDULE_SVC_DOWNTIME;<host_name>;<service_description>;<start_time>;<end_time>;<fixed>;<trigger_id>;<duration>;<author>;<comment>
SEND_CUSTOM_HOST_NOTIFICATION;<host_name>;<options>;<author>;<comment>
SEND_CUSTOM_SVC_NOTIFICATION;<host_name>;<service_description>;<options>;<author>;<comment>
SET_HOST_NOTIFICATION_NUMBER;<host_name>;<notification_number>
SET_SVC_NOTIFICATION_NUMBER;<host_name>;<service_description>;<notification_number>
START_OBSESSING_OVER_HOST;<host_name>
START_OBSESSING_OVER_SVC;<host_name>;<service_description>
STOP_OBSESSING_OVER_HOST;<host_name>
STOP_OBSESSING_OVER_SVC;<host_name>;<service_description>
