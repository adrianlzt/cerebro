https://facebook.github.io/react/docs/react-dom.html

If you use React as a script tag, these top-level APIs are available on the ReactDOM global. If you use ES6 with npm, you can write import ReactDOM from 'react-dom'. If you use ES5 with npm, you can write var ReactDOM = require('react-dom').


# Obtener un nodo de javascript directamente (fuera de react)
https://facebook.github.io/react/docs/react-dom.html#finddomnode
const node = ReactDOM.findDOMNode(mapRef);

Nos puede ser útil si se lo queremos pasar a una 3rd library.
