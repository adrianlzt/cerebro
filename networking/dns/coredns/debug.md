# Debug
https://coredns.io/plugins/debug/

Bajo nivel, formato pcap


# Logging
Mostrar las queries

example.org {
    file db.example.org
    log
}

Ejemplo:
[INFO] [::1]:44390 - 63751 "AAAA IN www.example.org. udp 45 false 4096" NOERROR qr,aa,rd,ra 121 0.000106009s
