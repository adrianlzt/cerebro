Alerting rules in Prometheus servers send alerts to an Alertmanager.
The Alertmanager then manages those alerts, including silencing, inhibition, aggregation and sending out notifications via methods such as email, on-call notification systems, and chat platforms.

Step-by-step configurando prometheus para enviar alarmas a slack y emails usando gmail
https://grafana.com/blog/2020/02/25/step-by-step-guide-to-setting-up-prometheus-alertmanager-with-slack-pagerduty-and-gmail/


# Configuración

Se realiza toda en un fichero .yaml con distintas secciones.

Ejemplo de fichero: https://github.com/prometheus/alertmanager/blob/main/doc/examples/simple.yml

## Conceptos
Grouping: agrupar alarmas
Inhibition (dependencias entre alarmas): no enviar ciertas alarmas si hay otras disparadas 
Silences (blackouts): silenciar ciertas alarmas durante un tiempo

## global
Para poner defaults.
Los valores que se pueden definir aquí también se pueden reedefinir en cada sección.

Será donde configuraremos los parámetros para enviar notificaciones (tokes, usuarios, passwords, etc)

## route
Web donde podemos pegar el fichero de configuración y nos pinta el "routing": https://www.prometheus.io/webtools/alerting/routing-tree-editor/

## inhibit_rules

## receivers

## templates
