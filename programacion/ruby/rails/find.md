http://guides.rubyonrails.org/active_record_querying.html

Project.find(3)

Client.first

Client.last

Client.take <- SELECT * FROM clients LIMIT 1
Client.take(2) <- SELECT * FROM clients LIMIT 2

Nos devuelve solo 1
  Project.find_by name: "pepe"
Nos devuelve todos los que matchean
  Client.where(first_name: 'Lifo').take

Client.find([1, 10]) <- SELECT * FROM clients WHERE (clients.id IN (1,10))
