Actions:	show	create	update	destroy
SQL:		select	create	update	delete
REST		get	post	put	delete

Rails 1:		Rails2+			Actions		Ruby-rails
GET /users/show/3	GET /users/3		SHOW		link_to 'show', zombie
POST /users/create	POST /users		CREATE		link_to 'create', zombie, method: :post
POST /users/update/3	PUT /users/3		UPDATE		link_to 'update', zombie, method: :put
POST /users/destroy/3	DELETE /users/3		DESTROY		link_to 'delete', zombie, method: :delete

Los navegadores no soportan PUT y DELETE, por lo que se hace es en el formulario poner un parámetro de HTML5:
<a href="/bla" data-method="put" rel="nofollow">update</a>
Un javascript convierte eso a:
<form method="post" action="/bla">
  <input name="_method" value="delete" />
</form>



