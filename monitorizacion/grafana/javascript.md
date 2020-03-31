Para poder embeder JS pasar esta opción:
GF_PANELS_DISABLE_SANITIZE_HTML=true

https://community.grafana.com/t/solved-embedding-javascript-into-text-panel/6672

Ejemplo de script en un panel html
https://community.grafana.com/t/mqtt-data-in-html-panel/14120


# Control grafana

## Modificar time interval
https://github.com/grafana/grafana/blob/154fbe2413f9abe33157baa563e42fbf67e2f27b/public/app/features/dashboard/timepicker/timepicker.ts

timeSrv = angular.element('grafana-app').injector().get('timeSrv');
timeSrv.setTime({from: "$date_range_start", to: "$date_range_end"});
timeSrv.setTime({ from: "2020-03-29 11:10:00", to: "now" })


Cambiar autorefresh:
timeSrv.setAutoRefresh("5s");

Desactivar autorefresh:
timeSrv.setAutoRefresh(false);
