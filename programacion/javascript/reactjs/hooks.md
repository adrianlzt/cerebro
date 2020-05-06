https://reactjs.org/docs/hooks-intro.html

Nos permite hacer cosas en componentes sin tener que usar clases.
Son únicos de cada componente, creando dos con el mismo nombre en distintos componentes no quiere decir que compartan el estado.


Ejemplo usando el "state":
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}


Si creo una función que encapsule el useState y uso esa función en otras dos funciones, cada una de esas dos funciones tendrán "su" copia de ese useCustom que he creado.
Vamos, que no se puede crear una función con un useState y compartir el estado en distintas funciones. O se hace de otra manera.
https://codesandbox.io/s/react-playground-ci5e3?file=/Hello.js





Timer:
const [time, setTime] = useState(Date.now());

useEffect(() => {
  const interval = setInterval(() => setTime(Date.now()), 1000);
  return () => {
    clearInterval(interval);
  };
}, []);



Decidir cuando se ejecuta useEffect:
useEffect(() => {
  console.log('I will run after every render');
});

useEffect(() => {
  console.log('I will run only when valueA changes');
}, [valueA]);



# Rerender
Evitar un render si no han cambiado las props
https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-shouldcomponentupdate

const Button = React.memo((props) => {
  // your component
});


Si lo que estamos haciendo se juntar un hook que nos da valores y queremos almacenarlos, lo que podemos hacer para evitar renders infinitos es comparar el valor del useState con el último valor que tenemos y solo guardarlo si es distinto.



Se produce un rerender cuando un hook cambia (se usa "useState" o "setState")
