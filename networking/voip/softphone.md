Apps de softphone (para instalar en el móvil o pc para llamar o recibir llamadas):

Acrobits Softphone (6.5€, android / ios)

zoiper para linux
  quitar STUN en la config de la cuenta
  este es el que uso
  mirar que tena un tick verde arriba a la izquierda, es que estamos conectados

linphone (android, también tiene appimage para linux, pero no me funciona, no conecta)

jami, no me conecta, no he mirado mucho

blink, linux windows mac: https://icanblink.com/
  el mejor que he visto para linux y opensource
  no consigo compilarlo con yay, problemas con cython


# baresip
La primera vez que lo arrancamos nos creará una ~/.baresip con ficheros de config por defecto.

Para configurar una cuenta:
.baresip/accounts

Si queremos poder recibir llamadas, en .baresip/config descomentar:
sip_listen
