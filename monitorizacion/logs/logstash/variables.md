## Sacar valores de un evento ##

Ejemplo de evento:
{
  "type": "web",
  "response": {
    "status": 200
  },
  "ua": {
    "os": "Windows 7"
  }
}

[type]
[ua][os]

output {
  statsd {
    increment => "apache.%{[response][status]}"
  }
}

