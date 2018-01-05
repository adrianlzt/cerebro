Channels are socket-like objects used for the actual transfer of data across the session
You may only request a channel after negotiating encryption and authenticating.

SSH Assigned Numbers (RFC 4250)
SSH Protocol Architecture (RFC 4251)
SSH Authentication Protocol (RFC 4252)
SSH Transport Layer Protocol (RFC 4253)
SSH Connection Protocol (RFC 4254)

De forma resumida tenemos tres partes principales:
  transporte, que se encarga del cifrado
  autenticación, se encarga de loguearse con key, usuario/pass, etc
  connection, una vez con el transporte y autenticados, creamos channels por los que enviar comandos, redirigir puertos, etc

# Architecture
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


## Channel
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


## Session
Determinados tipos de canales tienen extensiones para realizar más acciones, por ejemplo pedir una PTY en caso del tipo "session".
Las opciones disponibles: https://tools.ietf.org/html/rfc4250#section-4.9.3

A session is a remote execution of a program.  The program may be a
shell, an application, a system command, or some built-in subsystem.
It may or may not have a tty, and may or may not involve X11
forwarding.  Multiple sessions can be active simultaneously.


pty: https://tools.ietf.org/html/rfc4254#section-6.2

definir variables de entorno: https://tools.ietf.org/html/rfc4254#section-6.4

shell or command: https://tools.ietf.org/html/rfc4254#section-6.5
  Podemos pedir al servidor que queremos arrancar una shell o llamar a un comando directamente
  Viendo el código de openssh (https://github.com/openssh/openssh-portable/blob/master/session.c#L460:3) lo que hace es ejecutar
    bash -c COMANDO (suponiendo que nuestra shell es bash, que chequeara mirando el /etc/passwd)

  En el caso de tener un forced-command definido se ejecutará este en vez del comando: https://github.com/openssh/openssh-portable/blob/master/session.c#L650
  mirar forced_command.md
