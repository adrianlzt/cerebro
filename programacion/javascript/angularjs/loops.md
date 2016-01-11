https://angular.io/docs/ts/latest/guide/template-syntax.html#ng-for

import {CORE_DIRECTIVES} from 'angular2/angular2';
...
    directives: [CORE_DIRECTIVES],
    ...

<li *ng-for="#hero of heroes">
