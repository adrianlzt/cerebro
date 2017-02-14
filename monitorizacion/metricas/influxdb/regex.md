Regex en WHERE
https://github.com/influxdata/influxdb/issues/2715

WHERE userAgent=~ /Chrome/

/nodo0[12]xx/


SELECT /1/ FROM cpu
  cogerá todos los campos que tengan un 1

SELECT value1 FROM cpu GROUP BY /h/

SELECT mean(/1/) FROM cpu
