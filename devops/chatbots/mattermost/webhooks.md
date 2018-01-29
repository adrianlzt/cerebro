https://docs.mattermost.com/developer/webhooks-incoming.html

curl -i -X POST -H 'Content-Type: application/json' -d '{"text": "Hello, this is some text\nThis is more text. :tada:"}' http://{your-mattermost-site}/hooks/xxx-generatedkey-xxx

Podemos pasar más parámetros en el json:
 "channel" <- haremos override del channel que tenga especificado el webhook al crearse
 "icon_url"
 "text" <- puede ser markdown
