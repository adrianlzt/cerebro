SELECT CURRENT_TIMESTAMP;
SELECT pg_sleep(60);
SELECT CURRENT_TIMESTAMP;


Meterla dentro de otra query, por ejemplo para mantener un lock:
select * from history_log,pg_sleep(30) limit 10;
