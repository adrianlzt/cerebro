https://support.zabbix.com/browse/ZBXNEXT-3877

The new work-flow for the server will be:

The Zabbix server will receive a new value.

The new value will be processed (trigger expressions evaluation, correlations etc).

The value will be prepared and sent to the history service.

If the history service is down, values will be buffered in the zabbix server.

After some seconds, a request with the same data that was not sent will be retried by the zabbix server until the request succeed.

The value will be stored in the value cache and local history cache.

The history service will take care of serving the received data through the new REST API.

Data sent from the zabbix server to the history service will also contain a TTL (time-to-live in seconds) of the value itself. This value will reflect the configuration applied in the zabbix server and used by the housekeeper process for deleting data. When the TTL of the value will expire, the value will be simply removed from the history service.
