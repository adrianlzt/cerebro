Grafana will zoom out with the following group by times:
0.1s, 1s, 5s, 10s, 30s, 1m, 5m, 10m, 30m, 1h, 3h, 12h, 1d, 7d, 30d, 1y

Calculo de que $interval utilizar para group by time:

app/features/panel/panel_helper.js:59
app/core/utils/kbn.js varias funciones

Cambios de escala se producen en (unidad ms/px):
esc  resolucion   span para 1358px
0.1s 500          690s  11.5m
1s   5000         6900s 115m
5s   7500         10350s 2.875h
10s  15000        20700s 5.75h
30s  45000        62100s 17.25h
1m   180000       248400s 69h 2.875d
5m   450000       621000s 7.1875d
10m  1200000      1656000s 19.166d
30m  2700000      3726000s 43.125d
1h   7200000      9936000s 115d
12h  21600000     29808000s 345d
24h  86400000     119232000s 1380d 3.78y
24h  172800000    238464000s 7.56y
1w   604800000    834624000s 26.46y 
30d  1814400000   2503872000s 79,4y
1y   3628800000   5007744000s 158,8y

Ejemplo: para un span entre 2.875h y 5.75h Grafana elige agrupar cada 10s

Resolution = pixeles ancho de la grafica
span en ms / pixeles ancho de la pantalla

El cambio de resolución de 100ms a 1s se produce cuando tenemos 5s/px (para producir un cambio de un pixel de ancho las metricas tienen que estar a 5 segundos de distancia).


Para una pantalla de 1358px de ancho (la de mi portatil), los cambios se producen cada:
cambio_umbral ms/px * 1358 px / 1000 ms/s = x s
1s 679s
5s 6790s



500000 / 1000 px

500000 ms / 1000px = 0,5s/px

0,5s/px -> resolucion 0,1s

5s/px -> resolución 1s

      scope.resolution = Math.ceil($(window).width() * (scope.panel.span / 12));
      scope.interval = kbn.calculateInterval(scope.range, scope.resolution, scope.panel.interval);

Para la pantalla de mi portatil:
$(window).width() = 1358

Para la pantalla externa:
$(window).width() = 1280

round(tiempo_en_ms/width)

