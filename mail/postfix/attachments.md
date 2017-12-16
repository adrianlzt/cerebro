https://easyengine.io/tutorials/mail/postfix-attachment-size/

postconf | grep message_size_limit
  comprobar limite

postconf -e message_size_limit=52428800
  definir nuevo límite (50MB)
