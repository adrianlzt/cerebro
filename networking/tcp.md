https://www.frozentux.net/ipsysctl-tutorial/chunkyhtml/tcpvariables.html


- Básicamente TCP comienza aumentando exponencialmente %cwnd hasta que detecta congestión. En ese momento, se guarda el 50% del valor de %cwnd en %ssthresh y se resetea %cwnd. Se continúa con el crecimiento exponencial hasta que se supera %sshtresh, y entonces el crecimiento es lineal.  

Mirar los valores con ss


# Estados conexión tcp
https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.1.0/com.ibm.zos.v2r1.halu101/constatus.htm
tcp_status.gif


# RST / reset
https://isc.sans.edu/diary/The+special+case+of+TCP+RST/26824
Típico caso, enviar un paquete a un puerto cerrado.

Por lo visto no está estandarizado cuando se puede generar un RST
https://stackoverflow.com/a/251265

https://www.brendangregg.com/blog/2018-03-22/tcp-tracepoints.html
tcp:tcp_send_reset: This traces a RST send during a valid socket, to diagnose those type of issues.
