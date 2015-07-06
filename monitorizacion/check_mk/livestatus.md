http://mathias-kettner.de/checkmk_livestatus.html

Abre un socket con Nagios/Icinga para obtener información.
Livestatus make use of the Nagios Event Broker API

Si se intenta reiniciar icinga cuando hay una conexión al socket, el script de init.d no podrá parar icinga y terminará matándolo con un kill -9

# LQL
Query lenguage para livestatus
status - general performance and status information. This table contains exactly one dataset.
columns - a complete list of all tables and columns available via Livestatus, including descriptions!


Ejemplo de query al socket:
$ nc -U /var/spool/icinga/cmd/live
GET services

$ nc -U /var/spool/icinga/cmd/live <<< "GET services"


Un poco más escueta (obligatorio el Limit)
GET services
Columns: host_name host_state service_check_command service_description service_state
Limit: 1001

echo -e "GET services\nColumns: host_name host_state service_description\nLimit: 2" | nc -U /var/spool/icinga/cmd/live

Servicios staled más de 1.5 time periods:
echo -e "GET services\nColumns: host_name service_description host_staleness staleness\nFilter: service_staleness >= 1.5" | nc -U /var/spool/icinga/cmd/live

Staled y con un mensaje distinto de:
echo -e "GET services\nColumns: host_name service_description plugin_output host_staleness staleness\nFilter: service_staleness >= 1.5\nFilter: plugin_output != CRITICAL: Data not received" | nc -U /var/spool/icinga/cmd/live

Más complejo:
GET services
Columns: host_scheduled_downtime_depth service_last_check service_action_url_expanded service_icon_image service_notifications_enabled service_perf_data service_check_command service_custom_variable_names service_comments_with_extra_info host_filename service_scheduled_downtime_depth service_accept_passive_checks host_custom_variable_names host_state service_has_been_checked service_notes_url_expanded service_downtimes service_modified_attributes_list service_custom_variable_values service_acknowledged service_plugin_output host_has_been_checked service_last_state_change service_description service_in_notification_period service_active_checks_enabled service_pnpgraph_present host_custom_variable_values host_name service_is_flapping service_state
Filter: host_custom_variable_names < _REALNAME
Filter: host_custom_variable_names < _REALNAME
Limit: 1001
AuthUser: icingaadmin
Localtime: 1392820948
OutputFormat: python
KeepAlive: on
ResponseHeader:fixed16


# Condicionales
GET services
Filter: state = 1
Filter: state = 3
Or: 2


GET services
Filter: state = 2
Filter: acknowledged = 1
And: 2
Filter: state = 0
Or: 2


# Contar
echo -e "GET services\nStats: service_staleness >= 1.5\nFilter: plugin_output != CRITICAL: Data not received" | nc -U /var/spool/icinga/cmd/live
Devuelve el número de servicios staled que cumplan el filtro

Servicios totales en estado OK:
echo -e "GET services\nStats: state = 0" | nc -U /var/spool/icinga/cmd/live

Servicios totales en estado OK y stalled:
echo -e "GET services\nStats: state = 0\nFilter: service_staleness >= 1.5" | nc -U /var/spool/icinga/cmd/live





## Acceso remoto
https://mathias-kettner.de/checkmk_livestatus.html#H1:Remote access to Livestatus via SSH or xinetd
ssh < query nagios@10.0.0.14 "unixcat /var/lib/nagios/rw/live"

# cat /etc/xinetd.d/livestatus
service livestatus
{ 
  type = UNLISTED
  port = 6557
  socket_type = stream
  protocol = tcp
  wait = no
  # limit to 100 connections per second. Disable 3 secs if above.
  cps = 100 3
  # set the number of maximum allowed parallel instances of unixcat.
  # Please make sure that this values is at least as high as
  # the number of threads defined with num_client_threads in
  # etc/mk-livestatus/nagios.cfg
  instances = 500
  # limit the maximum number of simultaneous connections from
  # one source IP address
  per_source = 250
  # Disable TCP delay, makes connection more responsive
  flags = NODELAY
  user = icinga
  server = /usr/bin/unixcat
  server_args = /var/spool/icinga/cmd/live
  # configure the IP address(es) of your Nagios server here:
  only_from = 127.0.0.1 0.0.0.0/0
  disable = no

  # Disable logging
  log_on_success =
}


echo -e "GET services\nColumns: host_name host_state service_description\nLimit: 2" | nc 10.0.26.19 6557



# Columas posibles
Para conocer todas las columnas posibles para host:
GET hosts
ColumnHeaders: on
Limit: 1

Columnas posibles para host
accept_passive_checks
acknowledged
acknowledgement_type
action_url
action_url_expanded
active_checks_enabled
address
alias
check_command
check_command_expanded
check_flapping_recovery_notification
check_freshness
check_interval
check_options
check_period
check_type
checks_enabled
childs
comments
comments_with_extra_info
comments_with_info
contact_groups
contacts
current_attempt
current_notification_number
custom_variable_names
custom_variable_values
custom_variables
display_name
downtimes
downtimes_with_info
event_handler
event_handler_enabled
execution_time
filename
first_notification_delay
flap_detection_enabled
groups
hard_state
has_been_checked
high_flap_threshold
icon_image
icon_image_alt
icon_image_expanded
in_check_period
in_notification_period
in_service_period
initial_state
is_executing
is_flapping
last_check
last_hard_state
last_hard_state_change
last_notification
last_state
last_state_change
last_time_down
last_time_unreachable
last_time_up
latency
long_plugin_output
low_flap_threshold
max_check_attempts
modified_attributes
modified_attributes_list
name
next_check
next_notification
no_more_notifications
notes
notes_expanded
notes_url
notes_url_expanded
notification_interval
notification_period
notifications_enabled
num_services
num_services_crit
num_services_hard_crit
num_services_hard_ok
num_services_hard_unknown
num_services_hard_warn
num_services_ok
num_services_pending
num_services_unknown
num_services_warn
obsess_over_host
parents
pending_flex_downtime
percent_state_change
perf_data
plugin_output
pnpgraph_present
process_performance_data
retry_interval
scheduled_downtime_depth
service_period
services
services_with_info
services_with_state
staleness
state
state_type
statusmap_image
total_services
worst_service_hard_state
worst_service_state
x_3d
y_3d
z_3d


Para conocer todas las columnas posibles para services:
GET services
ColumnHeaders: on
Limit: 1

Columnas posibles para services
accept_passive_checks
acknowledged
acknowledgement_type
action_url
action_url_expanded
active_checks_enabled
check_command
check_command_expanded
check_freshness
check_interval
check_options
check_period
check_type
checks_enabled
comments
comments_with_extra_info
comments_with_info
contact_groups
contacts
current_attempt
current_notification_number
custom_variable_names
custom_variable_values
custom_variables
description
display_name
downtimes
downtimes_with_info
event_handler
event_handler_enabled
execution_time
first_notification_delay
flap_detection_enabled
groups
has_been_checked
high_flap_threshold
host_accept_passive_checks
host_acknowledged
host_acknowledgement_type
host_action_url
host_action_url_expanded
host_active_checks_enabled
host_address
host_alias
host_check_command
host_check_command_expanded
host_check_flapping_recovery_notification
host_check_freshness
host_check_interval
host_check_options
host_check_period
host_check_type
host_checks_enabled
host_childs
host_comments
host_comments_with_extra_info
host_comments_with_info
host_contact_groups
host_contacts
host_current_attempt
host_current_notification_number
host_custom_variable_names
host_custom_variable_values
host_custom_variables
host_display_name
host_downtimes
host_downtimes_with_info
host_event_handler
host_event_handler_enabled
host_execution_time
host_filename
host_first_notification_delay
host_flap_detection_enabled
host_groups
host_hard_state
host_has_been_checked
host_high_flap_threshold
host_icon_image
host_icon_image_alt
host_icon_image_expanded
host_in_check_period
host_in_notification_period
host_in_service_period
host_initial_state
host_is_executing
host_is_flapping
host_last_check
host_last_hard_state
host_last_hard_state_change
host_last_notification
host_last_state
host_last_state_change
host_last_time_down
host_last_time_unreachable
host_last_time_up
host_latency
host_long_plugin_output
host_low_flap_threshold
host_max_check_attempts
host_modified_attributes
host_modified_attributes_list
host_name
host_next_check
host_next_notification
host_no_more_notifications
host_notes
host_notes_expanded
host_notes_url
host_notes_url_expanded
host_notification_interval
host_notification_period
host_notifications_enabled
host_num_services
host_num_services_crit
host_num_services_hard_crit
host_num_services_hard_ok
host_num_services_hard_unknown
host_num_services_hard_warn
host_num_services_ok
host_num_services_pending
host_num_services_unknown
host_num_services_warn
host_obsess_over_host
host_parents
host_pending_flex_downtime
host_percent_state_change
host_perf_data
host_plugin_output
host_pnpgraph_present
host_process_performance_data
host_retry_interval
host_scheduled_downtime_depth
host_service_period
host_services
host_services_with_info
host_services_with_state
host_staleness
host_state
host_state_type
host_statusmap_image
host_total_services
host_worst_service_hard_state
host_worst_service_state
host_x_3d
host_y_3d
host_z_3d
icon_image
icon_image_alt
icon_image_expanded
in_check_period
in_notification_period
in_service_period
initial_state
is_executing
is_flapping
last_check
last_hard_state
last_hard_state_change
last_notification
last_state
last_state_change
last_time_critical
last_time_ok
last_time_unknown
last_time_warning
latency
long_plugin_output
low_flap_threshold
max_check_attempts
modified_attributes
modified_attributes_list
next_check
next_notification
no_more_notifications
notes
notes_expanded
notes_url
notes_url_expanded
notification_interval
notification_period
notifications_enabled
obsess_over_service
percent_state_change
perf_data
plugin_output
pnpgraph_present
process_performance_data
retry_interval
scheduled_downtime_depth
service_period
staleness
state
state_type

