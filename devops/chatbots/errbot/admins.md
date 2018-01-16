La variable de conf BOT_ADMINS será una tupla con los administradores de la plataforma.
La clave que aparezca aquí será pasada al "build_identifier" para obtener que usuario es.

Para cogerlo como variable de entorno:
BOT_ADMINS = tuple(os.getenv("BOT_ADMINS","").split(","))
