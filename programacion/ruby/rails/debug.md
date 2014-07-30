http://guides.rubyonrails.org/debugging_rails_applications.html

The default Rails log level is info in production mode and debug in development and test mode.

Para meter en los controllers, helpers, etc:
logger.debug "mensaje #{variable}"

Para meter en los templates:
<%= debug @post %>


## Usar la gema debugger ##
Gemfile:
  # Debbuging facilities
  gem 'debugger', group: :development

bundle install


Meter la línea 'debugger' donde queramos en los controllers.

Tenemos que arrancar el server web como:
rails server --debugger

También podemos usarlo con la consola
rails c --debugger

Al pasar por esa línea se parará la ejecucción y tendremos como un rails console abierto.
