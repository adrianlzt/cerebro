Alerting: Elasticsearch support
<https://github.com/grafana/grafana/issues/5893>

# Contact points

A quien se alerta y como

# Notification Policies

Enrutado de alertas a contact points.

# AlertManager

Desde la interfaz de grafana podemos manejar distintos AlertManager.

Los contact points, notification policies, alert rules, etc serán de cada AlertManager.
Tendremos que tener una configuración de contact point y notification policy por AlertManager.

# Estados

Las alertas pasan por un estado "Pending" antes de ser disparadas.
Esto es para evitar "falsos positivos" y el ruido que conllevan.

En k8s he visto que estaba mal configuado. Un CronJob ejecuta jobs, el pending era 15' y los Jobs que se generaban solo duraban 5', por lo que nunca saltaba.
