http://www.postgresql.org/docs/8.0/static/functions-datetime.html

Hora en unix epoch en segundos:
SELECT ROUND(EXTRACT(EPOCH FROM now()));
