https://home-assistant.io/developers/rest_api/

POST /api/states/<entity_id>
{
    "state": "below_horizon",
    "attributes": {
        "next_rising":"2016-05-31T03:39:14+00:00",
        "next_setting":"2016-05-31T19:16:42+00:00"
    }
}

Ejemplo:
http -v  POST https://duckdns.org:8123/api/states/sensor.lavadora x-ha-access:PASSWORD state=true attributes:='{"fin": "1h"}'
