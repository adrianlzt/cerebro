https://facebook.github.io/react/docs/introducing-jsx.html
https://facebook.github.io/react/docs/jsx-in-depth.html

Extension de javascript que usaremos como templates para describir el aspecto de la UI.
Usar camelcase

Siempre debe empezar con "<X...". Ese primera palabra tras el "<" será el tipo de elemento React que estaremos creando.

const elementoUno = <h1>Hello, world!</h1>;
Genera un "elemento" React

Para meter JS dentro usaremos los corchetes:
hola {name}
2+2 son {2+2}

Usaremos "" para definir literals dentro de los JSX

Podremos crear JSX de componentes nuestros
const element = <Welcome name="Sara" />;
Esto sería algo así como: element = Welcome(name="sara")


# Ejemplo
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);


# Condicionales
{ variable == "cosa" &&
  <Comp>cosa</Comp>
  ||
  <Comp2>otro {var}</Comp2>
}

## Operador tenario
The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.

{isLoggedIn ? (
  <LogoutButton onClick={this.handleLogoutClick} />
) : (
  <LoginButton onClick={this.handleLoginClick} />
)}


# Listas
{numbers.map((number) =>
  <ListItem key={number.toString()}
            value={number} />
)}


# Definir strings + variables
<div className={'FancyBorder FancyBorder-' + props.color}>


# XSS
Es seguro antes XSS, podemos mostrar el input de un usuario directamente.



# Internals
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);

const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);

// Note: this structure is simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world'
  }
};



# Loop
http://codepen.io/adrianlzt/pen/pNKZzb?editors=1010

{this.props.fullInfo.daily.data.map(dayData =>
  <DayWeather key={dayData.time} {...dayData} />
)}



<GoogleMap>
  {props.markers.map((marker, index) => (
    <Marker
      {...marker}
      onRightClick={() => props.onMarkerRightClick(index)}
    />
  ))}
</GoogleMap>


## Loop hash
http://codepen.io/adrianlzt/pen/pNKZzb?editors=1010
Usar .map, con forEach no entiendo porque pero no me funcionaba

<div>
  {Object.keys(x).map(key => {
    return (
      <p>{key}</p>
    )
  })}
</div>
