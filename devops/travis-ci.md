https://travis-ci.org/

Travis CI is a hosted continuous integration service for the open source community. It is integrated with GitHub and offers first class support for:
C
C++
Clojure
Erlang
Go
Groovy
Haskell
Java
JavaScript (with Node.js)
Objective-C
Perl
PHP
Puppet modules
Python
Ruby
Scala

Our CI environment provides multiple runtimes (e.g. Node.js or PHP versions), data stores and so on. Because of this, hosting your project on travis-ci.org means you can effortlessly test your library or applications against multiple runtimes and data stores without even having all of them installed locally.


## Usando travis-ci
http://about.travis-ci.org/docs/user/getting-started/

Nos damos de alta con la cuenta de github.
Ir al profile y activar algún proyecto.
Crear el fichero .travis.yml
language: ruby
rvm:
  - 1.9.3
  - jruby-18mode # JRuby in 1.8 mode
  - jruby-19mode # JRuby in 1.9 mode
  - rbx-18mode
  - rbx-19mode
  - 1.8.7

Instalamos travis-lint para comprobar que el fichero yaml es correcto
gem install travis-lint
travis-lint


Cada vez que hagamos un push, el código se pondrá a la cola de travis, y cuando haya un worker disponible se ejecutará nuestro código.
También podemos forzar una ejecución desde "GitHub service hooks page and use the "Test Hook" button for Travis"

Para meter el iconito de como ha ido la compilación, pinchamos sobre el engranaje que está debajo de nuestro nombre en travis-ci, y seleccionamos el Markdown.
Lo copiamos en nuestro README.md de github y listo.


Travis-ci tambien lanza pruebas contra pull request que hagan a tu código.
