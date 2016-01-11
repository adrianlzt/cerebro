https://angular.io/docs/ts/latest/guide/displaying-data.html
https://angular.io/docs/ts/latest/guide/template-syntax.html#ng-model
binding.md

# Inline
template: '<h1>{{title}}</h1><h2>{{hero.name}} details!</h2><div><label>id: </label>{{hero.id}}</div><div><label>name: </label>{{hero.name}}</div>'


# Multilinea
template:`
  <h1>{{title}}</h1>
  <h2>{{hero.name}} details!</h2>
  <div><label>id: </label>{{hero.id}}</div>
  <div><label>name: </label>{{hero.name}}</div>
  `

# Con fichero
templateUrl: "app/listado.html"

