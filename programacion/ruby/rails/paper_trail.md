http://railscasts.com/episodes/255-undo-with-paper-trail
https://github.com/airblade/paper_trail

Track changes to your models' data. Good for auditing or versioning.


## Instalación ##
Gemfile:
  # Versioning module
  gem 'paper_trail'

Instalar gema
  bundle

Crear migración para generar las tablas de versioning
  rails generate paper_trail:install

Aplicar migración
  rake db:migrate

## Configuración ##
Poner "has_paper_trail" en los modelos que queramos tener versioning


## Operaciones sobre los elementos ##
https://github.com/airblade/paper_trail#api-summary


reify regenera el objeto a partir del version:
  objeto.versions[1].reify.parametro_del_objeto

Obtener todos los parámetros históricos de un objeto:
scores = []
@player.versions.each do |version|
    unless version.reify.nil?
        scores << version.reify.score
    end
end
