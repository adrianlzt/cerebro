Son javascripts que se encuentran en:
/home/adrian/.config/chromium/Default/Extensions

Para conocer el id de la app podemos buscarla en https://chrome.google.com/webstore

# Skel
En el fichero manifest.json se define que ficheros se ejecutan cuando la extensión está en background

# Notificaciones
chrome.notifications.create("asda",{ 'priority': 2, 'type': 'basic', 'iconUrl': 'img/icon_48.png', 'title': "title", 'contextMessage': "context", 'message': "message" })

# Debugear
chrome://extensions/
Activar "Modo de desarrollador"

Pinchar sobre el icono de la extensión con el botón derecho y dar a "Inspeccionar ventana emergente"

En la variable chrome hay cosas interesantes.

# Instalar extensiones desde codigo
chrome://extensions/
Activar modo desarrollador
"Cargar extension descomprimida..."


# Logger
https://stackoverflow.com/questions/3829150/google-chrome-extension-console-log-from-background-page
Parece que tengo que meterlas así. Tal vez no siempre
chrome.extension.getBackgroundPage().console.log('onEntryData:');
