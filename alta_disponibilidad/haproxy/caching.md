HAproxy no está pensado para cachear objectos, auqnue si que se puede mientras sean pequeños.
Por defecto el tamaño máximo de cacheo es tune.bufsize=16KB

Aumentar ese valor aumenta el coste en memoria de cada conexión (cada conex usa 2 x tune.bufsize)
