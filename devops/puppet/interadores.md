fileserver_allowed => ['10.95.0.0/16',’10.20.0.0/8’],

<% fileserver_allowed.each do |line| -%>
  allow <%= line %>
<% end -%>


Resultado:
allow 10.95.0.0/16
allow 10.20.0.0/8
