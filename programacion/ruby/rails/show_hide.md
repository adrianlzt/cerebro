fichero.html.erb
<%= link_to "Show", {}, {id: "show_script"} %>
<pre id="update_script" style="display: none;">
blablabla
</pre>

app/assets/javascripts/NOMBRE.js
$(document).on('click','#show_script', function() {
  event.preventDefault();
  $("#show_script").show();
});

Se puede usar tambien .toggle() para cambiar entre show y hide

