Ficheros .erb - Embedded Ruby
Para reutilización mirar: templates_partials.md

<% evaluate ruby %>
<%= evaluate and print %>

Links: link_to nombre, path
<%= link_to tweet.zombie.name, zombie_path(tweet.zombie) %>
<%= link_to tweet.zombie.name, tweet.zombie %> <- mas sencillo

Edit & Delete:
<%= link_to "Edit", edit_tweet_path(tweet) %>
<%= link_to "Delete", tweet, :method => :delete %>


<%= link_to "Text", Code %>
Actions			Code				URL generated
List all tweets		tweets_path			/tweets
New tweet form		new_tweet_path			/tweets/new
Show a tweet		tweet				/tweets/n
Edit a tweet		edit_tweet_path(tweet)		/tweets/n/edit
Delete a tweet		tweet, :method => :delete	/tweets/n

En vez de _path, podemos poner _url para generar la url absoluta.

Las partes comunes (cabecera y pie) irán en app/views/layouts/application.html.erb (mirar layouts.md)


app/views/layouts/application.html.erb <- layout principal

<html>
 <head>
  <title>Titulo</title>
  <%= stylesheet_link_tag :all %> <- añade todas las stylesheets, se convierte a <link href="...estilo.css" ... />
  <%= javascript_include_tag :defaults %> <- añade las librerías java script por defecto (jQuery)
  <%= csrf_meta_tag %> <- cross site request forgery, para evitar formularios desde webs externas
 </head>

 <body>
  <img src="bla.png" />

  <%= yield %>  <- esto será substituído con el template adecuado

 </body>
</html>


Mostrar "notices" al usuario:
<% if flash[:notice] %>
  <div id="notice"<%= flash[:notice] %></div>
<% end %>


# Bucles
Mirar bucles haciendo _partials, para evitar tener que escribir el bucle en si
<% @zombies.each do |zombie| %>
  <%= zombie.name %>
  <%= zombie.brain.flavor %>
<% end %>
Esta forma es incorrecta, ya que realiza N+1 queries a la base de datos (para obtener el brain.flavor)

Para mejorar esto, en el controlador, donde definimos la variable @zombies, haremos lo siguiente:
@zombies = Zombie.includes(:brain).all
De esta manera se hará únicamente dos queries, una para obtener los zombies y otra para obtener todos los cerebros.


# Character escapes / safe strings
<%= tweet.body %> <- es seguro, convierte los caracteres a su código ascii
<%= raw @tweet.body %> <- inseguro!, pone los characters html tal cual. Alguien puede insertar código javascript en un campo que se ejecutará en los otros usuarios


# Div helper
<%= div_for tweet do %> <- usa dom_id(@tweet) para obtener "tweet_2"
  <%= tweet.body %>
<% end %>

Genera
<div id="tweet_<%= tweet.id %>" class="tweet">
  <%= tweet.body %>
</div>


# More helpers: http://guides.rubyonrails.org/active_support_core_extensions.html
<%= truncate("I need brains!", length: 10) %>  <- "I need bra..."
<%= truncate("I need brains!", length: 10, separator: ' ') %>  <- "I need..."

I see <%= pluralize(Zombie.count, "zombie") %>
  Zombie.count=1 ---> I see 1 zombie
  Zombie.count=2 ---> I see 2 zombies

Name: <%= @zombie.name.titleize %> <- Name: Pedro Martinez (pone las primeras en mayúsculas)

["Conde", "Baron", "Capitan"].to_sentence => "Conde, Baron, and Capitan"

time_ago_in_words @zombie.created_at -> 2 days ago

<%= number_to_currency 13.5 %> -> $13.50

<%= number_to_human 13232344323 %> -> 13.2 billion

