Sistema de gestión de eventos.

Backend python con almacenamiento en postgres.
Celery para gestionar tareas asíncronas.

Tiene una cli para poder interactuar con él sistema.

alerta login

alerta --endpoint-url <http://localhost:8000/> send -r recurso -e nombreEvento -E Production -s critical -S Database -g OS -v eventValue -e someDescription -T postgres -A foo=bar -O origin --customer customer

# Server

El server se suele configurar con variables de entorno.
Para arrancarlo en modo desarrollo:

```
ALERTA_SVR_CONF_FILE=$PWD/alertad.conf alertad --env-file .env run
```

# API

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Key The_Api_Key" \
  -d '{
    "event": "Database Connection Error",
    "resource": "database-primary",
    "severity": "major",
    "value": 0,
    "environment": "production",
    "text": "Failed to connect to the primary database.",
    "correlations": ["database-failure"],
    "summary": "Database connection error needs immediate attention!",
    "attributes": {
        "error_code": "10061",
        "retry_count": 3
    },
    "tags": ["database", "error", "connection"]
  }' \
  127.0.0.1:8080/alert
```

# Multitenancy / Customer views

<https://docs.alerta.io/customer-views.html#customer-views>
