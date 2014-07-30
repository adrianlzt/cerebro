http://docs.puppetlabs.com/guides/templating.html

Se meten en ${module_name}/templates
Los ficheros deben tener la extensión .erb

Para meter el template: 
fichero.pp
file {'/tmp/bla':
  content => template("${module_name}/motd.erb"),
  owner => 'root',
  group => 'root',
  mode => '0644',
}
El fichero deberá existir en ${module_name}/templates/motd.erb

Si llamamos a una clase con "include nombre", los parámetros por defecto no se setearán, y no se podrán usar como variables en el template.
Tendremos que llamar a la clase con "class {'nombre': }"


Es como las plantillas de django, donde se meten variables y expresiones en un fichero que se generará dinámicamente.

Lo que esta entre <% %> se interpreta como ruby.
Lo que está entre <%= %> se evalua y devuelve el resultado.

Ejemplo de como podría ser el motd.ebr
domain is <%= @domain %>
os is <%= @operatingsystem %>

Una variable @var en el manifest de puppet se debe declarar como $var = ...

Variables globales con @: <%= @var %>
Varibables locales sin arroba:
<% servers_real.each do |server| -%> 
  server <%= server %>
<% end -%> 

Facts, global variables, and local variables from the current scope are available to a template as Ruby instance variables — instead of Puppet’s $ prefix, they have an @ prefix. (e.g. @fqdn, @memoryfree, @operatingsystem, etc.)

Si queremos usar variables fuera del scope local, por ejemplo de una clase params:
<%= scope.lookupvar('apache::user') %>

<%# comentario %>
<%- como <% pero elimina espacios en blanco al comienzo
-%> igual que %> pero quita finales de linea al final

<%% pone el literal <%
%%> pone el literal %>


Para meterlo en un recurso file (va a cogerlo del directorio templates/ del módulo):
content => template('motd/motd.erb')


<% if @in_var %>
  outside_var has <%= @in_var %> value
<% end %>


## Iterar ##
$values = [val1, val2, otherval]

<% if @values and not @values.empty? -%>
  <% @values.each do |val| -%>
    Some stuff with <%= val %>
  <% end -%>
<% else -%>
  #No values in $values
<% end -%>

<%= k %> <%= if v.is_a? String; "\"#{v}\""; else;  v; end %>


## Syntax Checking: ERB files are easy to syntax check. For a file mytemplate.erb, run
erb -P -x -T '-' mytemplate.erb | ruby -c


## Substitución de caracteres
<%= @fqdn.gsub(/a/, 'b') %> <-- cambia las 'a' por 'b'
<%= @fqdn.sub(/a/, 'b') %> <-- cambia la primera 'a' por 'b'


# Partials #
<%= scope.function_template("#{el path que te mola}") %>

# Conditionals
<%= if @var != '' %>...<% end %>
<%= if v.is_a? String; "\"#{v}\""; else; v; end %>

# Hiera
<%= scope.function_hiera(['graphite_node']) %>



