    28	## Conectar interfaz grafica a gdb remoto ##
    29	
    30	En la maquina a analizar arrancar el gdb server (paquete RHEL gdb-gdbserver-7.2-60.el6_4.1.x86_64):
    31	gcc -g test.c -o exec
    32	gdbserver --remote-debug 10.0.2.15:8000 exec
    33	Cada vez que un cliente se desconecte, gdbserver se cierra y habrá que volverlo a arrancar
    34	
    35	Copiamos el test.c y el exec a la maquina cliente, y en ella ejecutamos (apunto a 127.0.0.1 porque el gdbserver esta en una VM con ese puerto redireccionado)
    36	# gdb
    37	(gdb) target remote 127.0.0.1:8000
    38	(gdb) file exec
    39	A program is being debugged already.
    40	Are you sure you want to change the file? (y o n) y
    41	Leyendo símbolos desde /tmp/exec...hecho.
    42	
    43	
    44	Para usar intefaz gráfica instalamos Nemiver
    45	Archivo -> Conectar con objetivo remoto
    46	  Ejecutable que cargar: el binario que esta siendo debugeado
    47	  Ubicación de las bibliotecas compartidas: /usr/lib 
    48	  Conexión TCP/IP: IP - Puerto
    49	
    50	Para que muestre el codigo fuente:
    51	Archivo -> Abrir archivo de fuentes -> Seleccionar desde el sistema de archivos
    52	Y elegimos el fichero .c
    53	 
    54	Asegurarnos que el gdbserver esta conectado y muestra trazas de que se está conectando el cliente.
