https://angular.io/docs/ts/latest/guide/template-syntax.html#ng-class

<li *ng-for="#hero of heroes" [ng-class]="getSelectedClass(hero)" (click)="onSelect(hero)">
  <span class="badge">{{hero.id}}</span> {{hero.name}}
</li>

  }
  getSelectedClass(hero: Hero) {
    return { 'selected': hero === this.selectedHero };
  }


Para cada elemento del array "heroes", se llama a la función getSelectedClass pasando cada uno de los objectos.
Si un objeto es igual al objecto this.selectedHero se retorna:
{ 'selected': true }

Este valor hace que ng-class ponga la clase selected en el li generado:
<li _ngcontent-uxa-1="" class="selected">
  <span _ngcontent-uxa-1="" class="badge">11</span> Mr. Nice
</li>
