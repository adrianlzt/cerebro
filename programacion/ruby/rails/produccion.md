http://guides.rubyonrails.org/asset_pipeline.html#in-production


Montar con passenger (mirar passenger.md)

Recordar setear "RailsEnv production" en el fichero de conf de apache.

Tambien recordar usar RAILS_ENV=production para los comandos de rails.

Crear la base de datos (config/database.yaml -> production):
rake db:setup RAILS_ENV=production

Precompilar los assets:
RAILS_ENV=production bundle exec rake assets:precompile

Por defecto solo pilla el application.js/.css
The default matcher for compiling files includes application.js, application.css and all non-JS/CSS files (this will include all image assets automatically) from app/assets folders including your gems.

Para elegir que assets queremos añadir (no poner la extension .coffee o .scss si la tienen):
config/application.rb:
  config.assets.precompile += ['admin.js', 'admin.css', 'swfObject.js']

Taambién se puede meter un código para compilar todos los ficheros:
# config/application.rb
config.assets.precompile << Proc.new do |path|
  if path =~ /\.(css|js)\z/
    full_path = Rails.application.assets.resolve(path).to_path
    app_assets_path = Rails.root.join('app', 'assets').to_path
    if full_path.starts_with? app_assets_path
      puts "including asset: " + full_path
      true
    else
      puts "excluding asset: " + full_path
      false
    end
  else
    false
  end
end


Todos los javascript irán metidos dentro del application-{md5-code}.js
Lo mismo pasa con los css
