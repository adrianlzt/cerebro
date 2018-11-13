https://www.zabbix.com/documentation/1.8/protocols
https://github.com/zabbix/zabbix/blob/bd849ec61b920dd4a0cfe2cdaa195e6545976d91/frontends/php/include/classes/server/CZabbixServer.php#L182

echo '{"request":"queue.get","sid":"0256aa0253c253a812f17a7755970baa","type":"overview"}' | nc zabbixserver 10051
