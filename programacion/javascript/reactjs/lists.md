https://facebook.github.io/react/docs/lists-and-keys.html

# Lists

const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);

// Generar una lista <ul><li..>...</ul>
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

Si vamos a unar forEach o map, dentro de estas funciones this tendra otro significado. Por eso fuera cogeremos las variables que vayamos a necesitar de this.

# Keys
https://facebook.github.io/react/docs/reconciliation.html#recursing-on-children
Keys help React identify which items have changed, are added, or are removed.

Deben usarse en el contexto del array. Si tenemos un item de una lista aislado, ese no tiene que tener key: https://facebook.github.io/react/docs/lists-and-keys.html#extracting-components-with-keys

A good rule of thumb is that elements inside the map() call need keys.

Las keys solo deben ser únicas para el array. Pueden repetirse ids entre distintos arrays.

El parametro key no se pasa hacia los componentes, tendremos que pasar el valor del id con otro nombre.

Generalmente usaremos el parametro id:
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);

Si no tenemos id, podemos usar el index (no usar si los items pueden ser reordenados -> lentitud):
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
