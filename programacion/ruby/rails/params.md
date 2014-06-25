Params es la variable donde se almacenan los datos que vienen en el GET o POST.

tweet/1  -> params[:id] = 1


Si tenemos un params como: {:tweet => { :status => "algo" } }
Podemos hacer: Tweet.create(params[:tweet])

<%= text_field "post[vip][#{vip.id}]", :name %>
<%= text_field "post[vip][#{vip.id}]", :ip %>
"vip"=>{"1"=>{"name"=>"MiprimeraVipPRE", "ip"=>"1.2.3.40"}, "2"=>{"name"=>"OtraVipPRE", "ip"=>"2.3.4.40"}}
