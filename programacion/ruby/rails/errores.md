Si cuando ejecutamos una acción nos da un false (indicando que ha fallado la operación), podemos consultar
t.errors
Para ver que error se ha producido


no database connection
Si al pedir una variable nos devuelve ese error, hacer Variable.count y volverá a funcionar.


# Saltar un error
raise "error"


# Devolver una web con un error
Crear el .html.erb del código que queramos en public
Ejemplo: public/403.html.erb

Yo he copiado el 500.html a 403.html.erb y he dejado este body
<body>
  <div class="dialog">
    <h1>Error 403</h1>
  </div>
  <p><%=  @error_message %></p>
</body>


Para saltar este error y salir inmediatamente:
@error_message="lo que queramos sacar"
render(:file => File.join(Rails.root, 'public/403.html'), :status => 403, :layout => false) and return


Si solo queremos sacar un error en texto (sin formato):
#render :status => :forbidden, :text => "Lo que queremos sacar" and return


undefined method `name' for #<Host:0x007f425032eaa8>
respond_to do |format|
      if @host.save
Mirar si la validación está chequeando un parametro que no existe



Problema instalando una gema con bundle install:
Instalarla a mano:
sudo gem install debugger -v '1.6.8' --install-dir /var/lib/gems/2.0.0/
Para saber el directorio:
bundle show ALGUNAGEMA
