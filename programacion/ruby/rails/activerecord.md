http://guides.rubyonrails.org/active_record_basics.html

Son los objetos de Rails con los que podemos hacer CRUD.


## Destroy ##
No debemos usar delete, ya que eso únicamente ejecuta el SQL para borrar la fila.
Debemos usar destroy, que inicia todo el proceso de borrado, quitando otros elementos en caso de que estuviesen así relacionados.


a.destroy
if a.destroyed?
  logger.debug "Elemento borrado"
else
  logger.debug "Elemento #{a.name} no ha sido borrado"
end


## Duplicar / clonar ##
new = old.dup
if new.save
  logger.debug "DEBUG: Generado #{new.name} con existo."
else
  logger.debug "DEBUG: Error generando #{new.name}. Valid? #{new.valid?}. Errors: #{new.errors.messages}"
end



## Comparación ##
s.attributes.except(:created_at, :updated_at) == Service.first.attributes.except(:created_at, :updated_at)
  compara todos los atributos except created_at y updated_at

excluded_fields = ["id","created_at","updated_at","host_group_id","environment_id"]
s.attributes.except(*excluded_fields)


## Atributos ##
s.attributes.each do |attr,value|
  ...
end
