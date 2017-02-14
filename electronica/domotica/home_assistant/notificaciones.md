# Push con chrome
Tendremos que crear un nuevo proyecto en google cloud, verificar el dominio (subir un fichero .html a nuestro dominio y que sea accesible via https)
Meteremos la "Clave de servidor" y "ID del remitente" en la conf de HA:
notify:
  - name: chrome_push
    platform: html5
    gcm_api_key: ''
    gcm_sender_id: ''

Instalaremos en el server:
apt install libffi-dev libpython-dev libssl-dev
pip install pywebpush

Reiniciar HA. Entrar en la web y mover el slider de push notifications. Chrome nos preguntará si aceptamos.
Tras esto, ir al fichero html5_push_registrations.conf y dar un nombre al dispositivo que acabamos de registrar.

Podemos probarlo desde el "Call service"


# Facebook
https://home-assistant.io/components/notify.facebook/
Enviar mensajes a usuarios via mensajes de messenger
