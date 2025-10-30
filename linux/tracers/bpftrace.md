https://github.com/bpftrace/bpftrace
https://bpftrace.org/

High-level tracing language for Linux

Capturando una llamada a una librería con un uprobe:

```bash
bpftrace -e 'uprobe:/usr/sbin/zabbix_server_pgsql:zbx_setproctitle { printf("PID %d changing title to: %s\n", pid, str(arg0)); }'
```
