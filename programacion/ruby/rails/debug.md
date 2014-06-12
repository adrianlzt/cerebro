http://guides.rubyonrails.org/debugging_rails_applications.html

Para meter en los controllers, helpers, etc:
logger.debug "mensaje #{variable}"

Para meter en los templates:
<%= debug @post %>


## Usar la gema debugger ##
NO ME FUNCIONA: /var/lib/gems/2.0.0/gems/activesupport-4.0.2/lib/active_support/dependencies.rb:229:in `require': malloc: possible integer overflow (ArgumentError)


Gemfile:
  # Debbuging facilities
  gem 'debugger', group: :development

bundle install


Meter la línea 'debugger' donde queramos en los controllers.

Tenemos que arrancar el server web como:
rails server --debugger

Al pasar por esa línea se parará la ejecucción y tendremos como un rails console abierto.
