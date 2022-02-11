https://godoc.org/github.com/google/gopacket

Libreria para decodificar paquetes

Ejemplo: https://github.com/chifflier/nfqueue-go/blob/master/nfqueue/test_nfqueue_gopacket/test_nfqueue.go#L19


# Conex tcp
import "net"
conn, err := net.Dial("tcp", "127.0.0.1:9000")
conn.Write([]byte("hola"))
buf := make([]byte, 100)
conn.Read(buf)


# IP
netip.Addr menos memoria que net.IP
