https://www.ruby-toolbox.com/

http://rubygems.org
Es la paquetería de ruby

Buscar gemas instaladas localmente
gem search nombre

Buscar gemas en rubygems
gem search -r nombre

Consultar info de gema no instalada:
gem spec -r nombre

Ficheros que pertenecen a una gema
gem content nombre

Instalar:
gem install nombre
gem install mime-types --version 1.25.1
gem install -l gema.gem
gem install --ignore-dependencies gema
gem install -f gema

Bajar el fichero .gem
gem fetch nombre

Actualizar
gem update nombre

Directorio de instalación: 
gem environment gemdir

gem query -l -d json

Los binarios para ejecutar gemas en
/usr/local/bin

Para usarlas primero deberemos cargar la libreria:
require 'rubygems'

Las gemas también suelen tener un rpm asociado, estilo rubygems-nombre
Al instalar este rpm 'gem' detectará la gema instalada.


## Crear nuestra propia gema http://guides.rubygems.org/make-your-own-gem/
USAR BUNDLER -> bundler.md

Crear repo en github
git clone github....
cd hola
mkdir lib
vi lib/hola.rb
class Hola
  def self.hi
    puts "Hello world!"
  end
end

vi hola.gemspec
Gem::Specification.new do |s|
  s.name        = 'hola'
  s.version     = '0.0.0'
  s.date        = '2010-04-28'
  s.summary     = "Hola!"
  s.description = "A simple hello world gem"
  s.authors     = ["Nick Quaranto"]
  s.email       = 'nick@quaran.to'
  s.files       = ["lib/hola.rb"]
  s.homepage    =
    'http://rubygems.org/gems/hola'
  s.license       = 'MIT'
end

He dejado un gemspec en este directorio (ejemplo.gemspec)
Especificación para el gemspec: http://guides.rubygems.org/specification-reference/

gem build hola.gemspec
Nos genera el .gem en el directorio donde estemos
sudo gem install ./hola-0.0.1.gem

% irb
>> require 'hola'
=> true
>> Hola.hi
Hello world!

Otra forma: irb -Ilib -rhola

Obteniendo credenciales de rubygems (previamente he creado una cuenta)
curl -u pepe https://rubygems.org/api/v1/api_key.yaml > ~/.gem/credentials; chmod 0600 ~/.gem/credentials

gem push hola-0.0.1.gem

https://rubygems.org/gems/hola


## Instalar gemas locales ##
gem install --local nombre-version.gem


## Instalar gemas detrás de un proxy ##
gem install --http-proxy http://proxy1.service.inet:6444 unicorn
HTTP_PROXY=http://wolfbyte:secret@pigsy:8080 gem install bla

## Instalar en un dir ##
sudo gem install debugger -v '1.6.8' --install-dir /var/lib/gems/2.0.0/


## Bajar una gema localmente y todas sus dependencias ##
Gemfile
  source "http://rubygems.org" 
  gem 'rails', '3.2.1'

bundle install
bundle package
ls -la vendor/cache



## Crear repo local ##
http://stackoverflow.com/questions/8411045/how-to-build-a-rubygems-mirror-server
