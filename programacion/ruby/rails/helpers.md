ui/app/helpers

Son métodos de ayuda para ciertas cosas.
Por ejemplo:
  link_to("undo", blabla_path())

Si tenemos una ruta que se llame "blabla", automáticamente se generará el helper blabla_path para generar el link a esa ruta.


Truco, si queremos acceder a un helper de otra clase:
  view_context.link_to("undo", blabla_path())


Meter helpers en assets: http://stackoverflow.com/questions/14284278/how-to-include-actionview-helpers-in-the-assets-pipeline
Meter en config/initializers/helpers_assets.rb
Rails.application.assets.context_class.class_eval do
  include ActionView::Helpers
  include MyAppHelper
  include Rails.application.routes.url_helpers
end
