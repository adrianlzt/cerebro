https://www.google.com/intl/es/chrome/demos/speech.html

http://stackoverflow.com/questions/26485531/google-speech-api-v2

Hay que unirse al foro de desarrolladores de google para que aparezca la opción para habilitar esta api.
https://console.developers.google.com/apis/library

Go to Credentials, Create new Key, Server Key. You may optionally specify a list of IPs, for security.


https://progfruits.wordpress.com/2014/05/31/using-google-speech-api-from-python/
https://github.com/gillesdemey/google-speech-v2/


# Grabar FLAC
ffmpeg -f alsa -ac 1 -ar 16000 -i pulse OUTPUT.flac

# Enviar
curl -X POST --data-binary @OUTPUT.flac --header 'Content-Type: audio/x-flac; rate=16000;' 'https://www.google.com/speech-api/v2/recognize?output=json&lang=es-es&key=APIKEY'
