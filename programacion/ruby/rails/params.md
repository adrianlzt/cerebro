Params es la variable donde se almacenan los datos que vienen en el GET o POST.

tweet/1  -> params[:id] = 1


Si tenemos un params como: {:tweet => { :status => "algo" } }
Podemos hacer: Tweet.create(params[:tweet])
