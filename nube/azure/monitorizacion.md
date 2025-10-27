# VMInsights

Agentes antiguos?

```bash
/usr/bin/python3 /var/lib/waagent/Microsoft.Azure.Monitor.AzureMonitorLinuxAgent-1.37.1/agent.py -metrics
/usr/bin/python3 /var/lib/waagent/Microsoft.Azure.Monitor.AzureMonitorLinuxAgent-1.37.1/agent.py -syslogconfig
/opt/microsoft/azuremonitoragent/bin/mdsd -A -R -c /etc/opt/microsoft/azuremonitoragent/mdsd.xml -r /run/azuremonitoragent/default -S /var/opt/microsoft/azuremonitoragent/eh -L /var/opt/microsoft/azuremonitoragent/events
/opt/microsoft/azuremonitoragent/bin/agentlauncher --fluentBitPath /opt/microsoft/azuremonitoragent/bin/fluent-bit --agentLauncherLogFilePath /var/opt/microsoft/azuremonitoragent/log/agentlauncher.log --agentLauncherStateFilePath /var/opt/microsoft/azuremonitoragent/log/agentlauncher.state.log
/opt/microsoft/azuremonitoragent/bin/amacoreagent -c /etc/opt/microsoft/azuremonitoragent/amacoreagent --configport 12563 --amacalog /var/opt/microsoft/azuremonitoragent/log/amaca.log --giglaport=13005
/opt/microsoft/azuremonitoragent/bin/kqlextension/KqlExtension -dataDirectory /var/opt/microsoft/azuremonitoragent/log/
/usr/bin/python3 /var/lib/waagent/Microsoft.Azure.Monitor.AzureMonitorLinuxAgent-1.37.1/agent.py -transformconfig
/opt/microsoft/azuremonitoragent/bin/MetricsExtension -TokenSource AMCS -ManagedIdentity sai -DataDirectory /var/run/azuremetricsext -Input influxdb_local,otlp_grpc,otlp_grpc_prom -InfluxDbSocketPath /var/run/azuremonitoragent/mdm_influxdb.socket -LogLevel Info -Logger Console -OperationEnvironment AMA-Linux/1.37.1 -ConfigOverrides {"otlp":{"endpoints":["127.0.0.1:4316"]}}
```

## OTEL

<https://learn.microsoft.com/es-es/azure/azure-monitor/vm/vminsights-opentelemetry>

Están migrando a OTEL
