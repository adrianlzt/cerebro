# Quien envía paquetes RST
sudo /usr/share/bcc/tools/trace -t 't:tcp:tcp_send_reset "sport=%d --RST--> dport=%d", args->sport, args->dport'

Ejemplo:
TIME     PID     TID     COMM            FUNC
3.171397 1066060 1066060 asd             tcp_send_reset   sport=8080 -> RST -> dport=47084

Podemos hacer un pequeño programa en go que envíe un paquete RST a un puerto específico, para probar el script anterior.

```go
	conn.(*net.TCPConn).SetLinger(0)
	conn.(*net.TCPConn).Close()
```
