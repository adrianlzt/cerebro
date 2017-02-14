https://home-assistant.io/topics/secrets/

secrets.yaml
http_password: YOUR_PASSWORD



configuration.yaml
http:
  api_password: !secret http_password
