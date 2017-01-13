https://facebook.github.io/react/docs/forms.html

ReactJS es el que tiene que controlar el estado de los los componentes. Esto choca con que el usuario pueda modificar directamente los elementos.
La solución son los "controlled components". Lo que se hace es pasar los datos que escribe el usuario a reactjs y reactjs es quien se encarga de ponerlos en el formulario

Otra opción, si venimos de un código no ReactJS o trabajando con una lib no ReactJS son los https://facebook.github.io/react/docs/uncontrolled-components.html

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}


# Textarea
https://facebook.github.io/react/docs/forms.html#the-textarea-tag
Los <textarea> los trataremos igual, definiendo su 'value'


# Select
https://facebook.github.io/react/docs/forms.html#the-select-tag
En vez de poner el "selected" en una de las option para marcar uno, será el elemento "select" el que tenga un campo value donde estará el seleccionado.


# Fieldsets
En vez de un formulario tambien podemos usar fieldsets e ir actuando con el evento de cambio de valores en vez de esperar a que nos envien el formulario.

<fieldset>
  <legend>Enter temperature in Celsius:</legend>
  <input
    value={value}
    onChange={this.handleChange} />
  <BoilingVerdict
    celsius={parseFloat(value)} />
</fieldset>
