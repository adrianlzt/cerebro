https://www.frozentux.net/ipsysctl-tutorial/chunkyhtml/tcpvariables.html


- Básicamente TCP comienza aumentando exponencialmente %cwnd hasta que detecta congestión. En ese momento, se guarda el 50% del valor de %cwnd en %ssthresh y se resetea %cwnd. Se continúa con el crecimiento exponencial hasta que se supera %sshtresh, y entonces el crecimiento es lineal.  

Mirar los valores con ss


# Estados conexión tcp
https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.1.0/com.ibm.zos.v2r1.halu101/constatus.htm
tcp_status.gif


# RST / reset
