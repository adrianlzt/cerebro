http://andrewhfarmer.com/react-ajax-best-practices/

Varias opciones, la más simple, fetch() desde un componente padre.


# Fetch

Leer un json
componentDidMount() {
  fetch("http://httpbin.org/get")
    .then(response => response.json())
    .then(json => {
      console.log(json);
    });
}


Leer un fichero de texto (data.txt lo resolvera a $URLACTUAL/data.txt):
    fetch("data.txt")
      .then(response => response.text())
      .then(text => {
        console.log(text);
      });


Tambien podemos poner fetch("data.json") para leer de un fichero
https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
https://developer.mozilla.org/en-US/docs/Web/API/Response
