https://www.home-assistant.io/integrations/rest_command/

Si queremos obtener datos de una llamada HTTP mirar sensor platform=rest


# Example configuration.yaml entry
rest_command:
  my_request:
    url: https://slack.com/api/users.profile.set
    method: POST
    headers:
      authorization: !secret rest_headers_secret
      accept: "application/json, text/html"
      user-agent: 'Mozilla/5.0 {{ useragent }}'
    payload: '{"profile":{"status_text": "{{ status }}","status_emoji": "{{ emoji }}"}}'
    content_type:  'application/json; charset=utf-8'
    verify_ssl: true


Para pasar parémtros en la url:
url: "https://webhook.site/c9184fa2-8b11-4f41-980e-9af41fd716b9?timestamp={{now()}}&lat={{latitude}}&lng={{longitude}}"


Podemos ejecutarlos a mano desde

Si queremos pasar data poner el yaml mode y definir tipo:
service: rest_command.firebase_store
data:
  latitude: "At Work"
  longitude: ":calendar:"
