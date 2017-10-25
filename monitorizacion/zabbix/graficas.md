Las gráficas se generan al vuelo obteniendo la información de la base de datos.
Ejemplo de query SQL:

SELECT
  itemid,
  COUNT(*) AS count,
  AVG(value) AS avg,
  MIN(value) AS min,
  MAX(value) AS max,
  round(1138* MOD(CAST(clock AS BIGINT)+1956,3600)/(3600),0) AS i,
  MAX(clock) AS clock
FROM
  history_uint
WHERE
  itemid='23292' AND
  clock>='1508938044' AND
  clock<='1508941644'
GROUP BY
  itemid,
  round(1138* MOD(CAST(clock AS BIGINT)+1956,3600)/(3600),0);


El item que estamos sacando lo podemos ver con:
select * from items where itemid='23292';
