https://www.ruby-toolbox.com/categories/rails_authentication

Mirar devise.md


Por ejemplo, vamos a poner autorización en el edit de un elemento

def edit
  @tweet = Tweet.find(params[:id])
  if session[:zombie_id] != @tweet.zombie_id
    flash[:notice] = "Lo siento, no puedes editar este tweet"
    redirect_to(tweets_path)
  end
end

Otra forma más compacta (Rails 3)
def edit
  @tweet = Tweet.find(params[:id])
  if session[:zombie_id] != @tweet.zombie_id
    redirect_to(tweets_path, :notice => "Lo siento, no puedes editar este tweet")
  end
end


Para mostrar el flash tendremos que meter código en el template:
Mostrar "notices" al usuario:
<% if flash[:notice] %>
  <div id="notice"<%= flash[:notice] %></div>
<% end %>

