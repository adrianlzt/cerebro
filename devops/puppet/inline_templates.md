$var = inline_template("${monitorizacion::params::services_resource_dir}/<%=name.gsub(/\\s+/, '_').downcase %>.cfg")
  Siempre tenemos que devolver el valor de un inline_template a una variable, si no nos dará el error:
    Error: Function 'inline_template' must be the value of a statement

Pasar una variable, o, si no está definida, un valor por defecto
funcion {"nombre":
  param => inline_template("<%= @var || 'por defecto' %>")
}

flap_detection_enabled => inline_template("<%= '1' if @flap_detection_options %>"),
  CUIDADO! Si no esta definida nos pone el caracter vacío (NO nos pone nil)


Si definimos una variable dentro de un inline_template no se podrá usar en puppet. Tampoco si redefinimos la variable dentro del inline_template, no cogerá el valor.
$var3 = ''
inline_template("<% @var3 = 'pepe' %>")
notify {$var3: }
Devolverá el notify vacío.

Lo que si podemos hacer es modificar un array o hash:
$var = [1,2,3]
$var2 = inline_template("<%= @var.push(99) %>")
notify {$var: }
Devolverá 4 notify con valores 1,2,3 y 99



Borramos un elemento de un hash y ponemos el valor que tuviese en la variable $plugin2
$plugin2 = inline_template('<%= @var2.delete("plugin") -%>')


$var2 = parsejson('{"plugin" : "load", "Name" : "ssh", "Exec": "/usr/bin/sshd"}')
$plugin2 = inline_template('<%= @var2.delete("plugin") -%>')
$coso3 = inline_template('
<Plugin <%= @plugin2 %>>
<%- @var2.each do |k,v| -%>
<%= k %> = <%= v %>
<%- end -%>
</Plugin>')

<Plugin load>
Name = ssh
Exec = /usr/bin/sshd
</Plugin>
