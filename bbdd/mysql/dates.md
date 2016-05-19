http://dev.mysql.com/doc/refman/5.7/en/date-and-time-types.html


El tipo DATETIME se usa cuando necesita valores que contienen información de fecha y hora. MySQL recibe y muestra los valores DATETIME en formato 'YYYY-MM-DD HH:MM:SS'

El tipo DATE se usa cuando necesita sólo un valor de fecha, sin una parte de hora. MySQL recibe y muestra los valores DATE en formato 'YYYY-MM-DD'

El tipo TIMESTAMP tiene varias propiedades, en función de la versión de MySQSL y el modo SQL que esté ejecutando el servidor.


Fecha aMctual:
curdate()

Quitar un dia al tiempo actual:
ColumnaTiempo >= CURDATE() - INTERVAL 1 DAY


SELECT * FROM objects
WHERE (date_field BETWEEN '2010-01-30 14:15:55' AND '2010-09-29 10:15:55')


WHERE   Closing_Date >= '2012-02-01' 
AND     Closing_Date <= '2012-12-31'


Tipos de fechas:
MONTH
DAY
HOUR
MINUTE

Iterar por fechas:
mysql> delimiter //
mysql> CREATE PROCEDURE contar(fin DATETIME)
BEGIN
REPEAT
SET @inicio = @inicio + INTERVAL 1 DAY;
select @inicio;
UNTIL @inicio > fin END REPEAT;
END
//
mysql> CALL contar(100)//



CREATE PROCEDURE contar(inicio DATETIME, fin DATETIME)
BEGIN
SET @fecha = inicio;
REPEAT
SET @fecha = @fecha + INTERVAL 1 DAY;
INSERT INTO tabla2 SELECT count(id),@fecha,iniciativa FROM tabla1 WHERE (@fecha BETWEEN fecha_inicio AND fecha_fin) GROUP BY iniciativa;
UNTIL @fecha >= fin END REPEAT;
END
//
