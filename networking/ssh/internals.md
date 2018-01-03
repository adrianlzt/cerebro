Channels are socket-like objects used for the actual transfer of data across the session
You may only request a channel after negotiating encryption and authenticating.

https://tools.ietf.org/html/rfc4251

   o  The Transport Layer Protocol [SSH-TRANS] provides server
      authentication, confidentiality, and integrity.  It may optionally
      also provide compression.  The transport layer will typically be
      run over a TCP/IP connection, but might also be used on top of any
      other reliable data stream.

   o  The User Authentication Protocol [SSH-USERAUTH] authenticates the
      client-side user to the server.  It runs over the transport layer
      protocol.

   o  The Connection Protocol [SSH-CONNECT] multiplexes the encrypted
      tunnel into several logical channels.  It runs over the user
      authentication protocol.

      The connection protocol provides channels that can be used for a wide
      range of purposes.  Standard methods are provided for setting up
      secure interactive shell sessions and for forwarding ("tunneling")
      arbitrary TCP/IP ports and X11 connections.



# Connection protocol
https://tools.ietf.org/html/rfc4254

This document describes the SSH Connection Protocol.  It provides
interactive login sessions, remote execution of commands, forwarded
TCP/IP connections, and forwarded X11 connections.  All of these
channels are multiplexed into a single encrypted tunnel.


Para establecer un canal:
Cuando establecemos una session, lo que hacemos es enviar un paquete SSH_MSG_CHANNEL_OPEN (90).
Si el servidor acepta nos contesta con SSH_MSG_CHANNEL_OPEN_CONFIRMATION (91)

Existen 4 tipos de canales distintos (https://tools.ietf.org/html/rfc4250#section-4.9.1)
  session
  x11
  forwarded-tcpip
  direct-tcpip


Cuando queramos enviar datos a un channel determinado usaremos un paquete SSH_MSG_CHANNEL_DATA, especificando a que canal y con la data que queramos.

Si no vamos a enviar más datos pondremos el mensaje: SSH_MSG_CHANNEL_EOF
Esto aún permite que el server nos envie datos.

Cuando alguno de los lados quiera cerrar definitivamente el canal enviará: SSH_MSG_CHANNEL_CLOSE
Que deberá ser contestado por el otro lado con el mismo mensaje.


Determinados tipos de canales tienen extensiones para realizar más acciones, por ejemplo pedir una PTY en caso del tipo "session".
Las opciones disponibles: https://tools.ietf.org/html/rfc4250#section-4.9.3
