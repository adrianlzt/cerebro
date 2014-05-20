http://guides.rubyonrails.org/active_record_querying.html
http://rubydoc.info/gems/activerecord/4.0.2/frames/ActiveRecord

Project.find(3)

Client.first

Client.last

Client.take <- SELECT * FROM clients LIMIT 1
Client.take(2) <- SELECT * FROM clients LIMIT 2

Nos devuelve solo 1
  Project.find_by name: "pepe"
  Client.where(first_name: 'Lifo').take

Nos devuelve todos los que matchean
  Client.where(first_name: 'Lifo')

Con multiples condiciones
  Client.where("orders_count = ? AND locked = ?", params[:orders], false)

Client.find([1, 10]) <- SELECT * FROM clients WHERE (clients.id IN (1,10))



Client.select("viewable_by, locked")
SELECT viewable_by, locked FROM clients


c.project.select("name").to_sql
"SELECT name FROM \"projects\" INNER JOIN \"contacts_projects\" ON \"projects\".\"id\" = \"contacts_projects\".\"project_id\" WHERE \"contacts_projects\".\"contact_id\" = ?"
