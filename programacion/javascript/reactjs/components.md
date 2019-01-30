https://facebook.github.io/react/docs/react-component.html
https://facebook.github.io/react/docs/components-and-props.html
https://blog.bitsrc.io/11-react-ui-component-playgrounds-for-2018-eef5a87a1bf8


Prebuild components: https://news.ycombinator.com/item?id=18234867
https://jetbrains.github.io/ring-ui/master/index.html?ref=stackshare


Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called "props") and return React elements describing what should appear on the screen.
Cuando creamos JSX, podemos crearlos tipos DOM (los típicos de HTML, h1, p, a, img, etc) o components que hayamos creado.
Siempre llamarlos con la primera letra en mayúscula.

Los "props" son los parámetros. Son read-only, no podemos modificarlos.

Generalmente tendremos un component "App", y ahí iremos metiendo el resto de components:
Components must return a single root element. This is why we added a <div> to contain all the <Welcome /> elements.

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name={variable} />
    </div>
  );
}


function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

O con clases:
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}


Definiendo un elemento de un component custom:
const element = <Welcome name="Sara" />;


# State / Estado / setState
Si creamos un component como una clase, en el constructor podemos crear una variable tipo this.state donde almacenar estados internos del objeto.

this.state tiene un significado especial, todo lo que se use en render deberá estar en "this.state".

Si queremos actualizar el render, debemos llamar a setState(), esto forzará un render nuevo.

Siempre que querramos modificar this.state (excepto en el constructor) lo llamaremos asi:
this.setState({fecha: "uno"})

Si estamos en un método: coso(variable) y hacemos this.setState({variable}) será como hacer ({variable: variable})

Si hay más variables en el state, no las tocará. Solo modificará fecha. (https://facebook.github.io/react/docs/state-and-lifecycle.html#state-updates-are-merged)

Any state is always owned by some specific component, and any data or UI derived from that state can only affect components "below" them in the tree.


Because this.props and this.state may be updated asynchronously, you should not rely on their values for calculating the next state.
Para tener el último estado podemos usar:
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));

O si solo queremos usar el prevState:
this.setState(prevState => ({
  counter: prevState.counter
}));


## Estado común
https://facebook.github.io/react/docs/lifting-state-up.html#lifting-state-up

Si necesitamos compartir un estado (el valor de una variable) lo que haremos es que el component de más alto nivel pasará el valor hacia los hijos y también pasará los handlers para cuando haga falta modificar ese valor.

Los valores deben seguir el flujo top-down.



# Children
https://facebook.github.io/react/docs/composition-vs-inheritance.html#containment

props.children tiene los elementos que definimos "dentro" de un elemento.

<MiElemento>
  <p>hola</p>
  <p>adios</p>
</MiElemento>

En MiElemento, props.children contendrá los dos elementos <p>



# Esqueleto de una clase

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return <h2>It is {this.state.date.toLocaleTimeString()}.</h2>;
  }
}



# Mounting
https://facebook.github.io/react/docs/react-component.html#mounting
Cuando el componente se pinta por primera vez en el DOM

  componentDidMount() {

  }


# Updating
https://facebook.github.io/react/docs/react-component.html#updating
An update can be caused by changes to props or state.

Un tipico ejemplo de este caso es esperar a tener un elemento, que al principio puede ser null, para hacer algo:
componentDitUpdate(prevProps, prevState) {
  if (prevProps.google !== this.props.google) {
    this.loadMap();
  }
}



# Unmounting
Cuando el se elmina el component del DOM

  componentWillUnmount() {

  }




# Pasar variables de un parent a los children
https://facebook.github.io/react/docs/react-api.html#cloneelement

En children tenemos varios componentes.
Lo que hacemos es pasarlos por cloneElement() para añadir a sus props esas 3 nuevas del padre.
return React.Children.map(children, c => {
  return React.cloneElement(c, {
    map: this.map,
    google: this.props.google,
    mapCenter: this.state.currentLocation
  });
})
