# Meter en el cron y ejecutar cada x minutos
# En el cron hacer redirección a null ( >& /dev/null)
# para no saturar el correo del usuario


#!/usr/pkg/bin/bash

NUEVO='mercadillo.asp.nuevo'
VIEJO='mercadillo.asp.antiguo'
DIFE='diferencias'
DIFFQ="diff -q $NUEVO $VIEJO"

curl http://www.infohielo.com/asp/mercadillo.asp -o $NUEVO

if $DIFFQ
	then
	echo "iguales"
else
	diff $NUEVO $VIEJO > $DIFE
	CONTAR=`wc -l $DIFE | awk '{print $1;}'`
	
	if [ $CONTAR -gt 20 ]; then
		echo "Muchas diferencias. Enviado email"
		echo "<a href='http://www.infohielo.com/asp/mercadillo.asp'>InfoHielo</a>" | mail -a $DIFE -s "Nuevo anuncio en InfoHielo" al@gmail.com
		rm $VIEJO
		mv $NUEVO $VIEJO
	else
		echo "pocas diferencias. No envio email"
	fi	
fi
