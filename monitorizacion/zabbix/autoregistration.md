Un host puede mandar un paquete trapper solicitando su "agent data" (los checks activos que debe monitorizar) y de esta manera estar solicitando su autoregistro.

Para que se autoregistre deberá existir un action tipo "Auto registration" donde haga match (su hostname o una metadata que puede enviar).
Ese action registrará el host, añadiéndolo a los hostgroups especificados y linkandolo con las templates que digamos.

Si hay varios actions que hacen match, se ejecutarán todos.
Si modificamos estos actions, o añadimos nuevos, no afectarán a los hosts ya registrados.
Podemos modificar el HostMetadata y reiniciar el agente para forzar un nuevo autoregistro.

An autoregistration attempt happens every time an active agent sends a request to refresh active checks to the server. The delay between requests is specified in the RefreshActiveChecks (120s por defecto) parameter of the agent. The first request is sent immediately after the agent is restarted.


Autoregistration is rerun:
    if host metadata information changes:
        due to HostMetadata changed and agent restarted
        due to value returned by HostMetadataItem changed
for manually created hosts with metadata missing
if a host is manually changed to be monitored by another Zabbix proxy
if autoregistration for the same host comes from a new Zabbix proxy


# Internal
send_list_of_active_checks_json esta es la función que parsea el json enviado por el agente y manda crear el host. Se puede pasar "ip", "port". El dns lo saca con una resolución inversa
  send_list_of_active_checks_json
  get_hostid_by_host(const zbx_socket_t *sock, const char *host, const char *ip, unsigned short port, const char *host_metadata, zbx_uint64_t *hostid, char *error)
    función que comprueba si existe el host y si no, lo crea (DBregister_host)

