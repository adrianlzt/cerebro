## Problemas en la replicación entre peers

Lo solucionamos con un soft restart:
splunk rolling-restart cluster-peers
http://docs.splunk.com/Documentation/Splunk/6.0/Indexer/Restartthecluster#The_rolling-restart_command
