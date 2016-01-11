http://flask.pocoo.org/docs/0.10/api/#url-route-registrations

app.add_url_rule('/hello/<username>', 'say_hello', view_func=views.say_hello)

app.add_url_rule('/rutinas/<int:rutina_id>/<int:ejercicio_id>', 'show_rutina', view_func=views.show_rutina, methods=['GET', 'POST'])



<string:nombre> es el de por defecto, no hace falta poner "string"
<int:numero>
<float:decimal>
<path:cosa> como string pero con barras
