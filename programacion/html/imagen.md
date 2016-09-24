http://www.w3schools.com/html/html_images.asp

<img src="pic_mountain.jpg" alt="Mountain View" style="width:304px;height:228px;">


# Imagen como html
https://news.ycombinator.com/item?id=12262470

Si al solicitar una url el servidor dice que es un:
Content-Type: text/html

Pero en realidad envia una imagen jpeg, el navegador intetará renderizar el comment del metadata del jpeg.

Para probarlo:
convert -size 100x100 xc: +noise Random random.jpg; convert random.jpg -set comment '<html><body style="visibility: hidden;"><div style="visibility: visible;"><h1>Hi</h1><br>Test text<br /><img src="#" /></div></body></html><!--' index.jpg; cp index.jpg index.html; open index.html; open index.jpg

El truco es hacer pensar al navegador que la imagen es un text/html. Entonces intentará renderizar el comentario.

