#!/bin/bash
echo "Content-type: text/html"
echo ""
echo ""

echo "TCPDUMP Server 2<br /><br />"

echo "Enviando mensaje ..: "
echo `dbus-send --system --print-reply --dest=es.mensaje.tcpdumper / local.TCPDumper.stop`

echo "<br /><br /><b>Proceso de captura detenido correctamente</b>"

