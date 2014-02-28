En el form:
<%= form_tag(copyenv_environments_path) do |f| %>
From: <%= collection_select(:post, :environment_id_from, Environment.all, :id, :name) %>
To: <%= collection_select(:post, :environment_id_to, Environment.all, :id, :name) %>
<%= submit_tag %>
<% end %>


En el post:
post[environment_id_from]:1
post[environment_id_to]:2

En el log (rails s):
Processing by EnvironmentsController#copyenv as HTML
  Parameters: {"utf8"=>"✓", "authenticity_token"=>"K+yktkAKCklhra8GMPpvMeC36IXmfAKoKzCpBo75gFU=", "post"=>{"environment_id_from"=>"1", "environment_id_to"=>"2"}, "commit"=>"Save changes"}


Para extraer los valores:
params[:post][:environment_id_from]
