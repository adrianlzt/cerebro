Hay unos cuantos backends que vienen por defecto.

El resto son repos separados.

Ejemplo de lo que debemos implementar para tener un backend propio: https://github.com/errbotio/errbot/blob/master/errbot/backends/null.py
Tambien debemos tener un fichero .plug. Ejemplo: https://raw.githubusercontent.com/errbotio/errbot-backend-skype/master/skype.plug
  aqui se define el nombre del fichero .py que será el backend

En config.py pondremos
BACKEND = 'NOMBRE'
BOT_EXTRA_BACKEND_DIR = '/path/nuestro/backend'

El backend debe heredar de Errbot. Ej.:
class NullBackend(ErrBot):

# Pasar mensajes al bot
msg = Message("hola")
msg.frm = TestPerson("asda@asd.com")
self.callback_message(msg)


# Recibir mensajes del bot
Primero el bot llamará a build_reply().
Del que espera obtener un objeto reply
Ejemplo: https://github.com/errbotio/errbot/blob/46302b04255c021d691189fb7d34c0b69017e43b/errbot/backends/test.py#L283

Luego llamará a send_message(msg) del backend
