https://mathias-kettner.de/checkmk_devel_multisite_icons.html

El python se ejecuta en la carga de la página. La función tiene a mano las variables abajo listadas y tiene que devolver una cadena html que se pondrá en la página.
Típicamente devolverá un link con un icono:
<a href="blabla"><img bla></a>

Mirar ejemplo en:
multisite_add_custom_icons_test.py

Ese fichero debería ir en
/usr/share/check_mk/web/plugins/icons

service httpd restart

Veremos todas las variables que tenemos accesibles en la interfaz web.


Variables disponibles:
{
 'host_scheduled_downtime_depth': 0,
 'service_last_check': 1438939907,
 'service_check_command': u'check_dummy!2 "Data not received"',
 'site': '',
 'service_staleness': 0.69999999999999996,
 'service_has_been_checked': 1,
 'service_notifications_enabled': 1,
 'service_host_name': u'dsmctools_master-1',
 'service_perf_data': u'',
 'service_action_url_expanded': u'',
 'service_custom_variable_names': [u'CHECK_NAME'],
 'service_comments_with_extra_info': [],
 'host_filename': u'',
 'service_scheduled_downtime_depth': 0,
 'service_accept_passive_checks': 1,
 'host_custom_variable_names': [u'PROJECT'],
 'host_state': 0,
 'service_icon_image': u'',
 'service_notes_url_expanded': u'serviwiki?project=dsmctools&hostname=dsmctools_master-1&service=apache_access_log&check_name=check_generic.pl',
 'service_downtimes': [],
 'service_modified_attributes_list': [],
 'service_custom_variable_values': [u'check_generic.pl'],
 'service_acknowledged': 0,
 'service_plugin_output': u'apache_pacemaker OK - OK: not running in this node',
 'host_has_been_checked': 1,
 'service_last_state_change': 1438616988,
 'service_description': u'apache_access_log',
 'service_in_notification_period': 1,
 'service_service_description': u'apache_access_log',
 'service_active_checks_enabled': 0,
 'service_pnpgraph_present': -1,
 'host_custom_variable_values': [u'dsmctools'],
 'host_name': u'dsmctools_master-1',
 'service_is_flapping': 0,
 'service_state': 0
}

Si tenemos definidos varios intentos tambien tendremos las variables:
 'service_max_check_attempts': 2
 'service_current_attempt': 1


service_comments_with_extra_info aqui estarán los mensajes de ack.
Ej.:
service_comments_with_extra_info': [[1, u'USUARIO', u'MENSAJE', 4, 1442915859]]
