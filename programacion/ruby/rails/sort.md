http://guides.rubyonrails.org/active_record_querying.html

checks.order('name ASC')

Check.order(name: :asc).where environment_id: 1


Conseguir que este elemento siempre aparezca ordenado alfabéticamente.
app/models/elemento.rb
default_scope { order(:name) }
