#!/bin/bash
echo "Content-type: text/html"
echo ""
echo ""

FNAME="CAPTURA_"`date +%d_%m_%Y_%H_%M_%N`".DUMP"
FILE="/opt/data/"$FNAME
echo "TCPDUMP Server 2<br /><br />"

/etc/init.d/tcpdump status > /dev/null 2>&1
if [ $? = 0 ]; then
	echo "Enviando mensaje ... "
	echo `dbus-send --system --print-reply --dest=es.mensaje.tcpdumper / local.TCPDumper.start string:"80" string:"$FILE"`

	echo "<br /><br /><b>Captura iniciada en puerto 80 en el fichero "$FNAME" </b>"
else
	echo "<br /><p style='color:red;'>Servidor TCPDump no iniciado. Arrancar mediante /etc/init.d/tcpdump. Avise al administrador</p>"
fi 
