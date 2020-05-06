https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import

Ejemplos de import:
import canUseDOM from "can-use-dom"
import _ from "underscore"
import { withGoogleMap,GoogleMap,Marker,InfoWindow } from "react-google-maps"
import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer"
import { export as alias } from "module-name";


Cuidado que el último ejemplo no funcionaría si pusiesemos: import {MarkerClusterer} from "react-google-maps/lib/addons/MarkerClusterer"




https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export

export { name1, name2, …, nameN };
Importado como
import {name1, name2} from ...

export default name1;
Importado como:
import xxx from ...
