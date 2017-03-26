https://www.html5rocks.com/en/tutorials/webrtc/basics/
https://tokbox.com/about-webrtc

Real-time communication without plugins
Imagine a world where your phone, TV and computer could all communicate on a common platform. Imagine it was easy to add video chat and peer-to-peer data sharing to your web application. That's the vision of WebRTC.


# APIs
WebRTC se implementa mediante 3 APIs:
getUserMedia: obtener video y audio del usuario
  Ej.: navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
RTCPeerConnection: component that handles stable and efficient communication of streaming data between peers.
  https://github.com/webrtc/adapter JavaScript shim that abstracts away browser differences and spec changes.
RTCDataChannel: real-time communication for other types of data. Enviar archivos, escritura en tiempo real, etc

Ejemplos: https://webrtc.github.io/samples/

Ejemplo simple y cutre de capturar la webcam:
<html>
  <body>
    <video id="video"></video>
  </body>
  <script>
    var video = document.getElementById('video');
    function showVideo(stream) {
      video.srcObject = stream;
    }
    navigator.mediaDevices.getUserMedia({video:true}).then(showVideo)
  </script>
</html>


# Signaling: session control, network and media information
signaling, mechanism to coordinate communication and to send control messages
No es parte de WebRTC
Se puede usar el que se quiera, SIP, XMPP u otro (debe ser duplex). Ejemplo usando XHR/XMLHttpRequest https://github.com/muaz-khan/XHR-Signaling

Signaling necesario para:
 - Session control messages: to initialize or close communication and report errors.
 - Network configuration: to the outside world, what's my computer's IP address and port?
 - Media capabilities: what codecs and resolutions can be handled by my browser and the browser it wants to communicate with?

## ICE framework, conectando peers
ICE:
  https://en.wikipedia.org/wiki/Interactive_Connectivity_Establishment
  https://www.html5rocks.com/en/tutorials/webrtc/basics/#ice

Este framework es lo que se utiliza para establecer un camino entre los peers.

El cliente envia una petición de BIND a un servidor STUN (por ejemplo: stun.l.google.com:19302)
El servidor nos contesta con la IP pública que él ve y el puerto que hemos usado para conectarnos con él.
Cuando conectamos con un peer, parece que nosotros enviamos paquetes UDP (por defecto, si no parece que salta a HTTP o HTTPS) al server STUN y este se los reenvia al peer.



# Tokbox
De pago. Facilita el despliegue de WebRTC.


# Montar webrtc
https://www.html5rocks.com/en/tutorials/webrtc/infrastructure/
https://www.webrtc-experiment.com/docs/TURN-server-installation-guide.html#centos
Como montar los servidores de señalización y metadata para tener WebRTC

WebRTC still needs servers:
For clients to exchange metadata to coordinate communication: this is called signaling.
To cope with network address translators (NATs) and firewalls.


# Librerias
http://peerjs.com/
Facilita la conexión p2p. Se puede usar un broker suyo o montar el nuestro propio.
