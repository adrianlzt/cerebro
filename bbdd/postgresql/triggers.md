<https://www.w3resource.com/PostgreSQL/postgresql-triggers.php>
<https://www.postgresql.org/docs/current/sql-createtrigger.html>
<https://www.postgresql.org/docs/current/plpgsql-trigger.html>

Podemos asociar funciones a las tablas que se ejecutarán antes/despues de los INSERT/UPDATE/DELETE.
Como los hooks en git.

Crearemos una function/procedure y luego la asociaremos a una tabla con un create trigger.

Mirar un ejemplo básico en blackhole.md

También existen "rules" (algo parecido), pero no se usan

Parece que los triggers se ejecutan después del parser, pero lo que no podríamos usarlo si el formato que nos dan es incorrecto.

# Desactivar triggers

<https://stackoverflow.com/questions/3942258/how-do-i-temporarily-disable-triggers-in-postgresql>

ALTER TABLE table_name DISABLE TRIGGER trigger_name
ALTER TABLE table_name ENABLE TRIGGER trigger_name
