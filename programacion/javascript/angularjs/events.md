https://angular.io/docs/ts/latest/guide/template-syntax.html#event-binding

<li *ng-for="#hero of heroes" (click)="onSelect(hero)">

Los paréntesis indican el target, que evento queremos registrar ("click") sobre que objecto ("li")
La izquierda del igual es la función a la que llamaremos.
