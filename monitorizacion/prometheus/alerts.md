# States

Inactive: The expression is false (e.g., CPU is at 50%). Everything is fine.

Pending: The expression is true (CPU is at 95%), but the for duration (5 minutes) has not passed yet. No notification is sent to Alertmanager yet.

Firing: The expression has been true continuously for the entire duration of the for clause. Prometheus now sends the alert to Alertmanager to notify you (via Slack, PagerDuty, Email, etc.).

# API

Get alerts

```bash
curl http://localhost:9090/api/v1/alerts
```

Ejemplo:

```json
{
  "status": "success",
  "data": {
    "alerts": [
      {
        "labels": {
          "alertname": "KubeControllerManagerDown",
          "job": "kube-controller-manager",
          "severity": "critical"
        },
        "annotations": {
          "description": "KubeControllerManager has disappeared from Prometheus target discovery.",
          "runbook_url": "https://runbooks.prometheus-operator.dev/runbooks/kubernetes/kubecontrollermanagerdown",
          "summary": "Target disappeared from Prometheus target discovery."
        },
        "state": "firing",
        "activeAt": "2025-12-05T06:37:44.745159254Z",
        "value": "1e+00"
      },
      {
        "labels": {
          "alertname": "Watchdog",
          "severity": "none"
        },
        "annotations": {
          "description": "This is an alert meant to ensure that the entire alerting pipeline is functional.\nThis alert is always firing, therefore it should always be firing in Alertmanager\nand always fire against a receiver. There are integrations with various notification\nmechanisms that send a notification when this alert is not firing. For example the\n\"DeadMansSnitch\" integration in PagerDuty.\n",
          "runbook_url": "https://runbooks.prometheus-operator.dev/runbooks/general/watchdog",
          "summary": "An alert that should always be firing to certify that Alertmanager is working properly."
        },
        "state": "firing",
        "activeAt": "2025-12-05T06:37:39.432644818Z",
        "value": "1e+00"
      },
      {
        "labels": {
          "alertname": "KubeProxyDown",
          "job": "kube-proxy",
          "severity": "critical"
        },
        "annotations": {
          "description": "KubeProxy has disappeared from Prometheus target discovery.",
          "runbook_url": "https://runbooks.prometheus-operator.dev/runbooks/kubernetes/kubeproxydown",
          "summary": "Target disappeared from Prometheus target discovery."
        },
        "state": "firing",
        "activeAt": "2025-12-05T06:37:34.377425736Z",
        "value": "1e+00"
      },
      {
        "labels": {
          "alertname": "KubeSchedulerDown",
          "job": "kube-scheduler",
          "severity": "critical"
        },
        "annotations": {
          "description": "KubeScheduler has disappeared from Prometheus target discovery.",
          "runbook_url": "https://runbooks.prometheus-operator.dev/runbooks/kubernetes/kubeschedulerdown",
          "summary": "Target disappeared from Prometheus target discovery."
        },
        "state": "firing",
        "activeAt": "2025-12-05T06:37:45.51115493Z",
        "value": "1e+00"
      }
    ]
  }
}
```
