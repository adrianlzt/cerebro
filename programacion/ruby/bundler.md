http://bundler.io/

Gestor de proyectos ruby.
Simplifica la recolección de gemas, instalación... 


bundle show GEMA



Railcast (video) de como usarlo: http://railscasts.com/episodes/245-new-gem-with-bundler

Como crear un proyeto: http://stackoverflow.com/questions/9549450/how-to-setup-a-basic-ruby-project

Ejemplos de proyectos para copiar estructura:
https://github.com/jimweirich/rake
https://github.com/github/hub

bundle gem nombre
Nos crea el directorio nombre con los ficheros necesarios y git iniciado

vim nombre.gemspec
Editar los que tienen el 'TODO'

Meter código en lib/nombre.rb

Construir gema:
gem build nombre.gemspec


# Dependencias http://guides.rubygems.org/specification-reference/#add_development_dependency
Gemfile: es donde se declararían las dependencias, pero bundler hace un enlace al .gemspec, asi que nosotros defimos las dependencias en el .gemspec

spec.add_development_dependency 'example'
spec.add_runtime_dependency 'example'

Una vez metidas las dependencias, en el working dir ejecutamos
bunlde
Y nos bajará las dependencias que necesitemos.


# Build, test and upload
Para construir la gema e instalarla:
rake build
gem install pkg/nombre-x.y.z.gem

Ahora la deberíamos probar para ver que todo es correcto.
$ irb
> require "nombre"
> nombre.hi

Para etiquetar la versión y subirla a rubgems
rake release


Poniendo un binario (del manual de make your own gem):
http://guides.rubygems.org/make-your-own-gem/#adding-an-executable
mkdir bin
touch bin/lci
chmod a+x bin/lci
vi bin/lci:

#!/usr/bin/env ruby

require 'rake'
Rake.application.run


lib/application.rb:
require 'optparse'
module Rake
  class Application
    def run
      handle_options
      load_blabla
      top_level
    end
    def handle_options
      # parsear opciones
    end
  end
end


En el .gemspec poner
s.executables << 'lci'
  No hace falta, el gemspec ya mete lo que haya en bin/

Aumentar lib/nobre/version.rb ?

Acordarse de meter los nuevos ficheros en el git, si no, no se meterán al .gemspec (ya que los coge con git ls-files)
git add bin/*
git cam "Binario de nuestra app"

Podemos testear nuestro binario con (los binarios los instala en /usr/local/bin, en Ubuntu):
ruby -Ilib/ bin/nombre


rake build
gem install pkg/nombre-x.y.z.gem

Testear

rake release



## Versiones ##

Most of the version specifiers, like >= 1.0, are self-explanatory. 
The specifier ~> has a special meaning, best shown by example. 
  ~> 2.0.3 is identical to >= 2.0.3 and < 2.1
  ~> 2.1 is identical to >= 2.1 and < 3.0
  ~> 2.2.beta will match prerelease versions like 2.2.beta.12.


## Entornos ## 
gem 'pg', group: :production
gem 'sqlite3', group: [:development, :test]

