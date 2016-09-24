Como crear un email correcto: https://www.sparkpost.com/blog/email-anatomy-infographic/


# Framework para escribir emails en html responsivos
https://mjml.io/


# Adjuntar imagenes y ponerlas en el html
https://sendgrid.com/blog/embedding-images-emails-facts/

<html>
  <body>
    <img src="cid:pepito-123"/>
  </body>
</html>

Al adjuntar la imagen tiene que ponerse con el content-id.
ejemplo:
------=_Part_17_843146408.1469090983927
Content-Type: image/png; name=test.png
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename=test.png
Content-ID: <pepito-123>
Content-Description: una descr

# Javascript
Los clientes no lo suelen soportar, y puede considerarse una razón para marcarlo como spam

# Estilo
http://templates.mailchimp.com/development/css/

Es dificil meter estilos porque la mayoría de los clientes no aceptan ponerlos, únicamente inline.

Templates de mailchimp: https://github.com/mailchimp/Email-Blueprints
