http://mathias-kettner.de/checkmk_livestatus.html

Abre un socket con Nagios/Icinga para obtener información.
Livestatus make use of the Nagios Event Broker API


Ejemplo de query al socket:
$ nc -U /var/spool/icinga/cmd/live
GET services

Un poco más escueta (obligatorio el Limit)
GET services
Columns: host_name host_state service_check_command service_description service_state
Limit: 1001

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

