Con un ejemplo básico
https://codesandbox.io/s/react-playground-ygj31?file=/Hello.js

yarn add react react-dom react-scripts
  este último para mostrar la web

src/index.js:
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

src/App.js:
import React from "react";
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
    </div>
  );
}

touch public/index.html
 necesita contenido?
 https://github.com/ahfarmer/calculator/blob/master/public/index.html
 creo que solo el div root es necesario

./node_modules/.bin/react-scripts start
