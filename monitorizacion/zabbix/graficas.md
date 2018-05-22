Las gráficas se generan al vuelo obteniendo la información de la base de datos.
La carga de generar la gráfica recae sobre el server.
Si usamos Grafana, este obtendrá los datos de la api o la bbdd y el peso de pintar recaerá sobre el navegador web del cliente.


Las graficas solo son de trend o de history, no se mezclan.
Se usa tren cuando pedimos un span que no esté en history o cuando solicitamos muchos datos.

En caso de trapper donde falten puntos, zabbix tirará líneas entre los puntos siempre. Podríamos no darnos cuenta de que estamos perdiendo datos.

Las gráficas de trends nos muestra valor mínimo, medio y máximo (en amarillo entre mínimo y máximo)


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
