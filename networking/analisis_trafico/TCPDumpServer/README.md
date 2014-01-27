Servidor que acepta paso de mensajes por dbus

El servidor (Daemon/TCPDumpServer) escucha mensaje por dbus, y se encarga de llamar a tcpdump para hacer un volcado a un fichero, hasta que de nuevo se pase otro mensaje para parar. Tambien está el fichero a instalar en init.d.

El cliente se comunica mediante DBus. La configuracion necesaria esta en etc.-.dbus-1.-.system.d/es.mensaje.tcpdump.conf
Para el paso de mensajes se puede ver como se hace en python (PythonClient), o usar los cgi-bin.

Se incluye tambien la configuración básica para ejecutar cgi-bin en Apache (etc.-.apache.-.sites-available/tcdump.conf)
