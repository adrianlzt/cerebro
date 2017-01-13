https://github.com/googlemaps/js-samples


# Javascript
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap" async defer></script>

# Draw
https://github.com/googlemaps/js-samples/blob/gh-pages/drawing/drawing-tools.html


https://developers.google.com/maps/documentation/javascript/3.exp/reference#DrawingManager
Cuando se termina de dibujar una figura se llama a un evento xxxcomplete.
Eg.:
google.maps.event.addListener(drawingManager, 'circlecomplete', function(e) {
   alert("circulo terminado");
});


## circulo simple
https://developers.google.com/maps/documentation/javascript/examples/circle-simple
Ejemplo de un bucle for pintando una serie de circulos.


Pintar un circulo
function initMap() {
  // Create the map.
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: {lat: 37.090, lng: -95.712},
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });

  var cityCircle = new google.maps.Circle({
    map: map,
    center: {lat: 49.25, lng: -123.1},
    radius: 1000000
  });
}

