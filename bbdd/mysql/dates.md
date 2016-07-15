http://dev.mysql.com/doc/refman/5.7/en/date-and-time-types.html
http://dev.mysql.com/doc/refman/5.7/en/date-calculations.html


El tipo DATETIME se usa cuando necesita valores que contienen información de fecha y hora. MySQL recibe y muestra los valores DATETIME en formato 'YYYY-MM-DD HH:MM:SS'

El tipo DATE se usa cuando necesita sólo un valor de fecha, sin una parte de hora. MySQL recibe y muestra los valores DATE en formato 'YYYY-MM-DD'

El tipo TIMESTAMP tiene varias propiedades, en función de la versión de MySQSL y el modo SQL que esté ejecutando el servidor.


MariaDB [prueba]> select NOW();
2016-07-05 08:31:03

MariaDB [prueba]> select CURDATE();
2016-07-05

MariaDB [prueba]> select CURTIME();
08:31:10


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


# TIMESTAMPDIFF
http://dev.mysql.com/doc/refman/5.7/en/date-and-time-functions.html#function_timestampdiff

mysql> SELECT TIMESTAMPDIFF(MONTH,'2003-02-01','2003-05-01');
        -> 3
mysql> SELECT TIMESTAMPDIFF(YEAR,'2002-05-01','2001-01-01');
        -> -1
mysql> SELECT TIMESTAMPDIFF(MINUTE,'2003-02-01','2003-05-01 12:05:55');
        -> 128885

# UTC
http://dev.mysql.com/doc/refman/5.7/en/date-and-time-functions.html#function_utc-timestamp

SELECT UTC_TIMESTAMP();

Nos da la hora en UTC
