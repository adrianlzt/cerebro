- Básicamente TCP comienza aumentando exponencialmente %cwnd hasta que detecta congestión. En ese momento, se guarda el 50% del valor de %cwnd en %ssthresh y se resetea %cwnd. Se continúa con el crecimiento exponencial hasta que se supera %sshtresh, y entonces el crecimiento es lineal.  

Mirar los valores con ss
