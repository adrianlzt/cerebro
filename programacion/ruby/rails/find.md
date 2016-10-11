http://guides.rubyonrails.org/active_record_querying.html
http://rubydoc.info/gems/activerecord/4.0.2/frames/ActiveRecord
crud.md

Project.find(3)
Project.find(3).delete

Client.first

Client.last

Client.take <- SELECT * FROM clients LIMIT 1
Client.take(2) <- SELECT * FROM clients LIMIT 2

Nos devuelve solo 1
  Project.find_by name: "pepe"
  Client.where(first_name: 'Lifo').take

Nos devuelve todos los que matchean
  Client.where(first_name: 'Lifo')

Service.where("check_id=? AND host_group_id is NULL",53)

Con multiples condiciones
  Client.where("orders_count = ? AND locked = ?", params[:orders], false)

Client.find([1, 10]) <- SELECT * FROM clients WHERE (clients.id IN (1,10))


Service.where("environment_id=? AND command_id=? AND name like(?)", 1, 118, "MySQL%").count


Client.select("viewable_by, locked")
SELECT viewable_by, locked FROM clients


c.project.select("name").to_sql
"SELECT name FROM \"projects\" INNER JOIN \"contacts_projects\" ON \"projects\".\"id\" = \"contacts_projects\".\"project_id\" WHERE \"contacts_projects\".\"contact_id\" = ?"
