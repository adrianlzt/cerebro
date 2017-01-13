https://github.com/tomchentw/react-google-maps

Si ponemos al comienzo del fichero
/* global google */
tendremos disponible el objeto google

# Eventos del mapa
https://github.com/tomchentw/react-google-maps/blob/3163a995adb5400f9324d24f24491ba261a6e469/src/lib/GoogleMap.js#L47


# Cluster de Markers
https://github.com/tomchentw/react-google-maps/blob/master/src/app/pages/addons/MarkerClustererExample.js#L40
Se usa con este import:
import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer"

gridSize el tamaño en pixels que va a acapara el cluster (cuanto más grande, mas markers se meterán dentro del grid)

Referencia: https://googlemaps.github.io/js-marker-clusterer/docs/reference.html
Codigo usado por react-google-maps: https://gist.github.com/mircobabini/a7e145f4182f80a2bbf8

Función que decide que se pinta: https://gist.github.com/mircobabini/a7e145f4182f80a2bbf8#file-lib-markerclusterer-2-1-2-js-L1570
Podemos pasar una custom como parámetro
calculator={(markers, numStyles) => {
  return {text: "Texto", index: 1, title: "Etiqueta al hacer ponernos encima"}
}}
El index parece que es para seleccionar el tipo de style: 1 para el primer estilo, 2 para el segundo, etc
Para cualquier número muy alto, siempre será el último estilo.
Style sera un array de estilos.



# Ejemplo básico
import React from 'react';
import ReactDOM from 'react-dom'
import { withGoogleMap,GoogleMap } from "react-google-maps";

const GettingStartedGoogleMap = withGoogleMap(props => (
    <GoogleMap
      defaultZoom={3}
      defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
    />
));


class App extends React.Component {
  render() {
    return (
      <GettingStartedGoogleMap
          containerElement={
                  <div style={{ height: `100%` }} />
                }
          mapElement={
                  <div style={{ height: `100%` }} />
                }
        />
    );
  }
}

export default App;





https://www.npmjs.com/package/google-maps-react
con manual: https://www.npmjs.com/package/google-maps-react

Ejemplo básico
import React from 'react';
import {Map} from 'google-maps-react';

class App extends React.Component {
  render() {
    return <Map google={window.google} zoom={14} />;
  }
}

export default App;







Ejemplo sencillo sin ninguna libreria:
https://codepen.io/adrianlzt/pen/GNxNyb



Para correr en local con npm start:

index.html:
<html>
  <head>
    <script src="https://maps.googleapis.com/maps/api/js?key=GOOGLE_API_KEY"></script>
  </head>
  <body>
    <div id="root"></div>



App.js:
import React from 'react';
import ReactDOM from 'react-dom'

class Map extends React.Component {
  componentDidMount() {
    const maps = this.props.google.maps;
    const node = ReactDOM.findDOMNode(this.refs.map);
    const mapConfig = Object.assign({}, {
      center: new maps.LatLng(40, -4),
      zoom: 6
    })
    this.map = new maps.Map(node, mapConfig);
  }

  render() {
    return (
      <div ref='map' style={{width: '100vw',height: '100vh'}}>
      </div>
    )
  }
}


class App extends React.Component {
  render() {
    return <Map google={window.google} />;
  }
}

export default App;

