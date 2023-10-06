/usr/bin/chromedriver --port=4444 --whitelisted-ips= --verbose

# Controlarlo con curl
Abrir un navegador:
curl -X POST http://localhost:4444/session -d '{"desiredCapabilities":{"browserName":"chrome"}}'

Coger el sessionId (jq .sessionId)

Navegar a una web:
curl -X POST http://localhost:4444/session/a46075846d87dc002fc75ba0632630cb/url -d '{"url": "https://example.com"}'


Endpoints disponibles
https://www.w3.org/TR/webdriver2/#endpoints


Ejemplo generados con copilot:

# Open a new session to a webdriver browser and get the session id
sessionID=$(curl -X POST http://localhost:4444/session -d '{"desiredCapabilities":{"browserName":"chrome"}}' | jq -r '.sessionId')

# Open the example.com page
curl -X POST http://localhost:4444/session/$sessionID/url -d '{"url":"http://google.com"}'

# Send the F12 keys
curl -X POST http://localhost:4444/session/$sessionID/keys -d '{"value":["F12"]}'

# Send the control+i keys
curl -X POST http://localhost:4444/session/$sessionID/keys -d '{"value":["\uE009i"]}'

# Send the control+shift+i keys
curl -X POST http://localhost:4444/session/$sessionID/keys -d '{"value":["\uE009\uE008i"]}'

# Click in the middle of the screen
curl -X POST http://localhost:4444/session/$sessionID/click -d '{"button":0}'

# Right click in the middle of the screen
curl -X POST http://localhost:4444/session/$sessionID/click -d '{"button":2}'

# Send the tab key
curl -X POST http://localhost:4444/session/$sessionID/keys -d '{"value":["\uE004"]}'
# Send down arrow
curl -X POST http://localhost:4444/session/$sessionID/keys -d '{"value":["\uE015"]}'
# Send Enter
curl -X POST http://localhost:4444/session/$sessionID/keys -d '{"value":["\uE007"]}'

# Open the console
curl -X POST http://localhost:4444/session/$sessionID/keys -d '{"value":["\uE00C"]}'

# Execute script "console.log('Hello World')"
curl -X POST http://localhost:4444/session/$sessionID/execute -d '{"script":"console.log(\"Hello World\")"}'

# Send control+R
curl -X POST http://localhost:4444/session/$sessionID/keys -d '{"value":["\uE009\uE003"]}'
