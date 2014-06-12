http://mustache.github.io/

Para hacer templates con código en {{}} y JSON

Hacer bucles:
{{#icones}}
  <span class="{{icone}}"></span>
{{/icones}}

Datos:
{"id":33,"hostname":"nomonit.com","class":null,"iconos":[{"icono":"satellite"},{"icono":"puppetdb"}]}
