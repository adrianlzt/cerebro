https://facebook.github.io/react/docs/rendering-elements.html

const element = <h1>Hello, world</h1>;
ReactDOM.render(
  element,
  document.getElementById('root')
);

En nuestro html tendremos el root dom:
<div id="root"></div>


In practice, most React apps only call ReactDOM.render() once.

React DOM compares the element and its children to the previous one, and only applies the DOM updates necessary to bring the DOM to the desired state.

CONCEPTO: In our experience, thinking about how the UI should look at any given moment rather than how to change it over time eliminates a whole class of bugs.


# Evitar el render
render null;
