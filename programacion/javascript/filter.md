Filtrar resultados con jquery en el lado del cliente
https://github.com/jiren/filter.js
http://jiren.github.io/filter.js/stream.html

Ejemplo en este directorio filter-demo/


Cargar todo y dejar el filtrado al cliente.
Se puede seguir enviando datos aunque la web ya haya cargado
http://blog.joshsoftware.com/2013/04/23/streamtable-js-the-next-generation-search-filter/
http://jiren.github.io/StreamTable.js/stream.html


Dentro del <script> donde metemos la parte que se va a repetir, si tenemos varios elementos no funciona bien.

Esto funcionará mal porque metera tags en <a> y en <br>.
<script>
<a href="blala">cosa</a>
<br>
</script>

Para que funcione meter todo dentro de un div:
<script>
<div>
<a href="blala">cosa</a>
<br>
</div>
</script>
