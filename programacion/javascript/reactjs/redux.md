https://redux.js.org/
https://react-redux.js.org/introduction/quick-start
Gestion global de estado

https://desarrolloweb.com/articulos/que-es-redux.html

Un store como fuente de verdad.
Las Views leen de ese store.

Si se quiere realizar alguna modificación, se genera un action.
Ese action lo reciben los reducers (reciben el action y el state) que son quienes modifican el estado global.


import { Provider } from "react-redux"
import createStore from "./src/state/createStore"

Encapsularemos toda nuestra app en el <Provider />, al que le pasaremos un objeto "store".

Para acceder al store usaremos:
import { connect } from "react-redux"


Mirar ejemplo simple:
https://github.com/gatsbyjs/gatsby/blob/master/examples/using-redux/wrap-with-provider.js




# Persistir / local storage
https://medium.com/@jrcreencia/persisting-redux-state-to-local-storage-f81eb0b90e7e

En el wrapper, al comienzo de la clase (cargamos el state del local storage y se lo pasamos al createStore para que decida si usar ese o el initialState):
  persistedState = loadState();
  store = createStore(this.persistedState);

  componentDidMount() {
    this.store.subscribe(
      throttle(() => {
        saveState(this.store.getState());
      }, 1000)
    );
  }

// TODO how to add default values for new keys?
const createStore = (persistedState) => {
  let state = initialState;

  if (persistedState) {
    state = persistedState
  }

  return reduxCreateStore(reducer, state)
}




# Dev tools
https://github.com/reduxjs/redux-devtools

Provee también de un entorno mejorado de debugging
DevTools for Redux with hot reloading, action replay, and customizable UI
