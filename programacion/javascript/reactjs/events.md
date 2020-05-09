https://facebook.github.io/react/docs/handling-events.html
https://facebook.github.io/react/docs/events.html

mirar tambien event_propagation.md para pasar eventos entre componentes

Llamar a los eventos con camelCase

<button onClick={activateLasers}>
  Activate Lasers
</button>


En un link, evitar efecto por defecto (ir a otra web):
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
    //e.target será el elemento que disparó el evento
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}


// Boton con un eventhandler. Forma recomendada
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

// Otra forma de tener this correctamente con una sintaxis experimental
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  };

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}


// O con arrow functions. Mejor usar el metodo del bind en el constructor. Este metodo puede traer otros problemas si este prop se pasa a otro componente
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
