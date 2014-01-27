rails g mailer ZombieMailer emailstipo1 emailstipo2

Nos generará un app/mailers/zombie_mailer.rb

Dentro de este habrá un def por cada tipo de emails que queramos enviar.
Las variables @... que ahí declaremos serán las que usemos en las vistas para generar el email.

En el def podemos definir una variable para obtener el elemento que queremos:
def emailstipo1(zombie)
  @zombie = zombie
  @last_tweet = @zombie.tweets.lasst


Podemos adjuntar ficheros:
attachments['x.pdf'] = File.read("#{Rails.root}/public/x.pdf"}

Mas opciónes para el envio de email:
mail to: @zombie.email, subject: "El asunto"
from: 
cc: 
bcc:
reply_to:

Todas estas opciones se pueden poner con valores por defecto tras declarar la clase con:
default from: "from@example.com"


El template del email se genera igual que el resto de vistas

Hola, <%= @zombie.name %>, este es tu email.
Ultimo tweet <%= @last_tweet.body %>


Por defecto los templates son texto plano (tipoemail1.text.erb).
Podemos usar plantillas html simplemente cambiando por tipemail1.html.erb

También podemos poner las dos plantillas, y enviara un multipart email, que mostrará el html si el receptor puede leerlo.


## Como enviar el email
Una forma es definir un callback para enviar emails ante un cambio. Lo haremos en el model:
class Zombie < ActiveRecord::Base
  after_save :envia_notificacion, if: :parametro_cambiado?
  private
  def envia_notificacion
    ZombieMailer.emailstipo1(self).deliver <- esto pasará el objeto Zombie como parámetro
  end 
end


## Mass mailing / mailing list ...
Si queremos hacer algo más complejo es mejor usar un SaaS externo.
Por ejemplo madmimi que nos proporciona una gema para ello.
