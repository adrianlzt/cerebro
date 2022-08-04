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
Toda alerta debe entrar por el "top-level route". De ahí baja hacia los child nodes.
Los child nodes tendrán condiciones para "coger" esas alarmas.

Ejemplos: https://github.com/prometheus/alertmanager/blob/main/doc/examples/simple.yml#L13

Dentro de un nodo pondemos tener más subnodos, si hace match en un nodo, se terminará ahí la alarma.
Si no hace match se devolverá al padre.
Ejemplo:
```
  routes:
    # This routes performs a regular expression match on alert labels to
    # catch alerts that are related to a list of services.
    - matchers:
        - service=~"foo1|foo2|baz"
      receiver: team-X-mails
      # The service has a sub-route for critical alerts, any alerts
      # that do not match, i.e. severity != critical, fall-back to the
      # parent node and are sent to 'team-X-mails'
      routes:
        - matchers:
            - severity="critical"
          receiver: team-X-pager
`````


Web donde podemos pegar el fichero de configuración y nos pinta el "routing": https://www.prometheus.io/webtools/alerting/routing-tree-editor/

## inhibit_rules

## receivers

## templates
