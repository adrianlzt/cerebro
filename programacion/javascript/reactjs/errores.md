Inline Babel script:3 Uncaught ReferenceError: Component is not defined
En vez de Component, poner React.Component.

O importar react como:
import React, { Component } from 'react';




Elementos que no se ven. Mirar a ver si su height es 0px




Uncaught TypeError: Cannot read property 'setState' of null
Falta el bind en el constructor:
this.handleClick = this.handleClick.bind(this);



React.createElement: type should not be null, undefined, boolean, or number. It should be a string (for DOM elements) or a ReactClass (for composite components).
Estamos definiendo un tipo que no existe.
Seguramente hayamos hecho un import de algo que no existe y lo estemos usando:
<CosaQueNoExiste />
