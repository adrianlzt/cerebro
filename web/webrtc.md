https://www.html5rocks.com/en/tutorials/webrtc/basics/
https://tokbox.com/about-webrtc

Real-time communication without plugins
Imagine a world where your phone, TV and computer could all communicate on a common platform. Imagine it was easy to add video chat and peer-to-peer data sharing to your web application. That's the vision of WebRTC.


WebRTC se implementa mediante 3 APIs:
getUserMedia: obtener video y audio del usuario
  Ej.: navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
RTCPeerConnection: component that handles stable and efficient communication of streaming data between peers.
  https://github.com/webrtc/adapter JavaScript shim that abstracts away browser differences and spec changes.



Tokbox
De pago. Facilita el despliegue de WebRTC.


https://www.html5rocks.com/en/tutorials/webrtc/infrastructure/
https://www.webrtc-experiment.com/docs/TURN-server-installation-guide.html#centos
Como montar los servidores de señalización y metadata para tener WebRTC


WebRTC still needs servers:
For clients to exchange metadata to coordinate communication: this is called signaling.
To cope with network address translators (NATs) and firewalls.
