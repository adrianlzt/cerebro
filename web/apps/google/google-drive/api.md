Conseguir credenciales oauth
https://console.developers.google.com/flows/enableapi?apiid=sheets.googleapis.com&pli=1
Tenemos que crear un proyecto al que irá asociado la api key


Python
pip install --upgrade google-api-python-client


# Autorización
https://developers.google.com/identity/protocols/OAuth2WebServer
https://developers.google.com/drive/v3/web/about-auth

Se debe realizar por OAuth2.0
Crear de tipo "Web" la credencial para poder definir a donde podemos hacer redirect tras solicitar el token al usuario.

La app solicita acceso para un scope determinado
Google abre el navegador solicitando al usuario que consienta el acceso
Si el usuario consiente, se le pasa a la app un access token de corta vida
Se usa el token para hacer las peticiones

Ejemplo en python para una app GAE con OAuth2 (webapp2)
https://github.com/google/google-api-python-client/blob/master/samples/appengine/main.py

Expiracion del token
https://developers.google.com/identity/protocols/OAuth2#expiration
Parece que dura una hora
http_auth = credentials.authorize(httplib2.Http())
credentials.refresh(http=http_auth)
Para refrescarlo automaticamente, pero en la web dice que más ed 25 veces muere.


SCOPES
tendremos que definir todas las que vayamos a usar (separados por espacios)
https://www.googleapis.com/auth/drive View and manage the files in your Google Drive
https://www.googleapis.com/auth/drive.appdata View and manage its own configuration data in your Google Drive
https://www.googleapis.com/auth/drive.file View and manage Google Drive files and folders that you have opened or created with this app
https://www.googleapis.com/auth/drive.metadata View and manage metadata of files in your Google Drive
https://www.googleapis.com/auth/drive.metadata.readonly View metadata for files in your Google Drive
https://www.googleapis.com/auth/drive.photos.readonly View the photos, videos and albums in your Google Photos
https://www.googleapis.com/auth/drive.readonly View the files in your Google Drive
https://www.googleapis.com/auth/drive.scripts Modify your Google Apps Script scripts' behavior


# Sheets
https://developers.google.com/sheets/quickstart/python
https://developers.google.com/api-client-library/python/apis/sheets/v4
https://developers.google.com/resources/api-libraries/documentation/sheets/v4/python/latest/sheets_v4.spreadsheets.html


Obtener valores de una sheet dando su id y un rango (ejemplo: "A2:E4") (por defecto cogerá la primera hoja):
https://developers.google.com/sheets/reference/rest/v4/spreadsheets.values/get
fsheet.values().get(spreadsheetId="1Ud6sn0Yxh9plSCRfl_deGMj4RRYgtamnFp3AHXnvogA", range="A2:E3").execute()

Escribir valores:
body = {'values': [ [1,2,'nuevo'],[23,34,'coso']]}
fsheet.values().update(spreadsheetId="1FMhJMs_I8hPbl4lAw9_TkZPoOaoZc", range="C1:E3", valueInputOption=("USER_ENTERED"), body=body).execute()

#Drive
https://developers.google.com/drive/v3/web/quickstart/python
https://developers.google.com/resources/api-libraries/documentation/drive/v3/python/latest/

Crear dir debajo de otro dir:
file = service.files().create(body={'name' : 'Invoices','mimeType' : 'application/vnd.google-apps.folder', 'parents': ['084NO1oyUXVhc0uE2E']},fields='id').execute()




# Errores
Si tenemos problemas de permisos revisar el SCOPE de las credentials
Puede que tengamos solo readonly y nos haga falta otra.
Algunas disponibles:
https://www.googleapis.com/auth/drive
https://www.googleapis.com/auth/drive.file
https://www.googleapis.com/auth/drive.appdata
https://www.googleapis.com/auth/drive.apps.readonly

Si ya tenemos generado el fichero en ~/.credentials tendremos que borrarlo.
