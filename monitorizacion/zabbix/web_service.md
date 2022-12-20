https://www.zabbix.com/documentation/6.0/en/manual/config/reports#configuration
https://www.zabbix.com/documentation/6.0/en/manual/appendix/install/web_service

En otra máquina levantamos zabbix_web_service, que levanta un servicio en el puerto 10053 donde escucha peticiones HTTP POST para devolver renders PDF.

Ejemplo de petición

curl -H "Content-Type:application/json" -XPOST localhost:10053/report -d '{"url":"https://zabbix.dominio.com/zabbix.php?action=dashboard.print&dashboardid=176&from=2022-10-18%2000%3A00%3A00&to=2022-10-19%2000%3A00%3A00","headers":{"Cookie":"zbx_session=eyJzZXNzaW9uaWQ4YjJhZWM4ZGI0MjdiZmEzODhkIn0="},"parameters":{"width":"1920","height": "1552"}}' -o reporte.pdf


La url de zabbix-web debe tener un certificado válido (o ser http).

