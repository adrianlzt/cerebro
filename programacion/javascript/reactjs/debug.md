https://github.com/facebook/react-devtools

Extension para chrome para analizar los componentes y elementos de reactjs
https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi



# Javascript
console.log("mensaje " + var);

console.dir(objeto); // podremos ver las propiedades del objeto en chrome


Poder acceder desde la consola del navegador a un objeto de react y desde ahí al resto:
componentDidMount() {
  // make the application available globally
  // DEBUG permite ejecutar cosas desde la consola del navegador, ej.:
  // window.App.XXX
  window.App = this;
}

