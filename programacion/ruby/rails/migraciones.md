http://guides.rubyonrails.org/migrations.html
https://gist.github.com/amejiarosario/2950888 # Cheat sheet
http://appletree.or.kr/quick_reference_cards/Ruby-Ruby_on_Rails/rails-migrations.pdf

## Migrations ##
Si queremos añadir nuevos datos a un recurso que ya tengamos creado:
rails g migration Add<LoQueQueremosAñadir>To<TableName> email:string soltero:boolean
La estructura Add<>To<> es obligatoria!

Ejemplo:
class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
    end
  end
end

Tipos: (mirar data_types.md)
t.string
t.text
t.integer
t.index


Podemos editar el .rb generado para añadir más opciones:
default: <value>
limit: <number>
null: false
first: true (posición de la columna en la tabla)
after: :email (posición de la columna en la tabla)
unique: true

# Borrar
También podemos usar una migración para borrar campos
rails g migration Remove<Cosa>From<Tabla> age:integer
La estructura Remove<>From<> es obligatoria!

# Otras migraciones: rails g migration <Anything>
http://api.rubyonrails.org/classes/ActiveRecord/Migration.html

IMPORTANTE! Si cambiamos un nombre, tendremos que cambiar a mano las vistas, controllers, etc que lo use

Nos generará un .rb vacío, listo para meter estos, u otros comandos:
Class NombreMigracion < ActiveRecord::Migration
  def change
    add_column :tweets, :part_number, :string
    change_column(table_name, column_name, type, options)
    rename_column :zombies, :oldname, :newname
    remove_column(table_name, column_names)
  
    create_table(name, options)
    change_table(name, options)
    rename_table :oldname, :newname
    drop_table :zombies
  
    add_index(table_name, column_names, options)
    remove_index(table_name, column: column_name)
    remove_index(table_name, name: index_name)
  end
end

Ejemplo sin comandos cortos:
change_table :products do |t|
  t.remove :description, :name
  t.string :part_number
  t.index :part_number
  t.rename :upccode, :upc_code
end

Para aplicar los cambios:
rake db:migrate


## Rollback ##
Si queremos deshacer la última migración:
rake db:rollback
  Evidentemente, los cambios que hayamos hecho en las columnas que se borren se perderán.

## Schema dump ##
Si queremos obtener el estado actual de la bbdd
rake db:schema:dump
Generará el fichero db/schema.rb con el esquema actual

## Crear y poblar bbdd ##
Si hemos descargado un app y queremos crear la base de datos
rake db:setup
Esto crea la base de datos, las tablas (basándose en el fichero schema.rb) y carga los datos (seeds.rb)


# Migración para cambiar una columna de tipo string a text
rails g migration ChangeCommandLineToText
class ChangeCommandLineToText < ActiveRecord::Migration
  def change
    change_column :commands, :command_line, :text
  end
end
