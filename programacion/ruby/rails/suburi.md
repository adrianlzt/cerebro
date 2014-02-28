Mirar passenger.md para la configuración de este.

Problema:
Un asset javascript usa un helper para definir donde hará un post.
El helper pone directamente la url, sin la suburi.

02/11 http://blog.obledesign.com/post/3469268947/rails-3-in-a-subdirectory
Definir RAILS_RELATIVE_URL_ROOT o definir nuevo scope.

09/13 http://stackoverflow.com/questions/18879225/rails-3-route-helpers-in-model-not-respecting-sub-uri
Definir nuevo scope

01/12 http://www.rubycoloredglasses.com/2012/01/configuring-rails-3-1-3-under-sub-uri/
Suburi + config.assets.prefix ?

http://www.modrails.com/documentation/Users%20guide%20Apache.html#deploying_rack_to_sub_uri
PassengerBaseURI /subapp        ?
PassengerAppRoot /websites/rac  ?


Parece que hay un bug en la versión actual: https://github.com/rails/rails/pull/12086
Parece que será con la variable config.relative_url_root
