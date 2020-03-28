https://easyengine.io/tutorials/mail/postfix-attachment-size/

postconf | grep message_size_limit
  comprobar limite

postconf -e message_size_limit=52428800
  definir nuevo límite (50MB)

Postfix comenzará a rechazar correos con "452 4.3.1 Insufficient system storage" si no tenemos 1.5*message_size_limit disponible en la partición donde esté la queue (/var/spool/postfix).
Monitorizar el disco con ese tamaño.
