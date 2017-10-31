https://docs.fluentd.org/v0.12/articles/filter-plugin-overview

Podemos hacer distintas operaciones sobre los eventos con los filters.

Los filters se aplicarán en orden de aparición.
Muchos filters pueden actuar sobre el mismo evento.
De hecho es normal encadenarlos.


Ejemplo, filtramos eventos (solo dejamos pasar los que tengan en hostname "miserver") y luego lo sacamos por stdout:
<filter **>
  @type grep
  <regexp>
    key hostname
    pattern miserver
  </regexp>
</filter>

<filter **>
  @type stdout
</filter>


En la version 0.14 se pueden usar keys tipo (https://github.com/fluent/fluentd/pull/1637):
$.key1.key2
o tambien
$['key1']['key2']
