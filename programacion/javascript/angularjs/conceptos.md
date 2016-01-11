# Visual Component

var AppComponent = ng
  .Component({
    selector: 'my-app',
    template: '<h1>My First Angular 2 App</h1>'
  })
  .Class({
    constructor: function () { }
  });


Component es el enlace con el html. Aqui le decimos que pinte 'template' donde encuentre 'my-app'

Class, es donde definimos la lógica.


# Bootstrap
Es el lanzador de nuestra app.

document.addEventListener('DOMContentLoaded', function() {
  ng.bootstrap(AppComponent);
});
