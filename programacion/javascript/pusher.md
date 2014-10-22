http://pusher.com/

Se trata de una app online de pago tipo public, subscribe.
El servidor hace push a pusher.com y todos los clientes que estén registrados reciben la información.
100.000 mensajes/dia y 20 conexiones máximas es gratuito.

Una solución DIY se puede hacer con socket.io

Publicar
pusher['my-channel'].trigger('my-event', {
  'message': 'hello world'
})

Subscribe (javascript):
var channel = pusher.subscribe('my-channel');
channel.bind('my-event', function(data) {
  alert('Received my-event with message: ' + data.message);
});

Los de codeship lo usan para actualizar su página web. Envían un push al cliente (navegador del usuario) cuando tiene que recargarse: http://blog.codeship.io/2014/05/13/pusher-realtime-messages.html
