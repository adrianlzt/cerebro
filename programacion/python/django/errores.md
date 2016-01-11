ImportError: Could not import settings 't4uAdmin.settings' (Is it on sys.path? Does it have syntax errors?): No module named t4uAdmin.settings
Es porque en el django.wsgi no hemos definido la ruta para que busque el fichero settings.
Poner en dicho fichero:
 	sys.path.append('/var/www/interfazAdmin')
Siendo la ruta el padre del directorio de nuestra app.
