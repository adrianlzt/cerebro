http://dev.mysql.com/doc/refman/5.0/en/repeat.html

mysql> delimiter //
mysql> CREATE PROCEDURE dorepeat(p1 INT)
    -> BEGIN
    -> SET @x = 0;
    -> REPEAT
    -> SET @x = @x + 1;
    -> UNTIL @x > p1 END REPEAT;
    -> END
    -> //
mysql> CALL dorepeat(100)//
mysql> SELECT @x//
+------+
| @x   |
+------+
|  101 |
+------+

El codigo del loop:
CREATE PROCEDURE dorepeat(p1 INT)
BEGIN
SET @x = 0;
REPEAT
SET @x = @x + 1;
UNTIL @x > p1 END REPEAT;
END
//

