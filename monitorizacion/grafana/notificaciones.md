http://docs.grafana.org/alerting/notifications

# Webhook

Ejemplo de notificación:

POST / HTTP/1.1
Host: a0f69af0.ngrok.io
User-Agent: Grafana
Content-Length: 386
Authorization: Basic cGVwZTpwZXBl
Content-Type: application/json
Accept-Encoding: gzip
X-Forwarded-Proto: https
X-Forwarded-For: 14.93.11.13

{"evalMatches":[{"value":100,"metric":"High value","tags":null},{"value":200,"metric":"Higher Value","tags":null}],"imageUrl":"http://grafana.org/assets/img/blog/mixed_styles.png","message":"Someone is testing the alert notification within grafana.","ruleId":0,"ruleName":"Test notification","ruleUrl":"https://localhost:3000/","state":"alerting","title":"[Alerting] Test notification"}


{
  "evalMatches": [
    {
      "value": 100,
      "metric": "High value",
      "tags": null
    },
    {
      "value": 200,
      "metric": "Higher Value",
      "tags": null
    }
  ],
  "imageUrl": "http://grafana.org/assets/img/blog/mixed_styles.png",
  "message": "Someone is testing the alert notification within grafana.",
  "ruleId": 0,
  "ruleName": "Test notification",
  "ruleUrl": "https://localhost:3000/",
  "state": "alerting",
  "title": "[Alerting] Test notification"
}

