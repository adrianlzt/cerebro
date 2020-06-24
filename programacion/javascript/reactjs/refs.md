https://facebook.github.io/react/docs/refs-and-the-dom.html

Podemos asignar la propiedad especial "ref" a un componente para poder luego acceder a el


<Websocket
  ref={node => this.websocket = node}

Así luego podemos usar this.websocket

