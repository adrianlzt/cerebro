Es lo que se usa HTTPS.

Alice se quiere comunicar con Bob.
Alice se inventa una clave (session key), y la encripta con la clave pública de Bob. Para cada paquete que genere Alice, se va a inventar una nueva clave.
Alice encripta el texto que quiere enviar con la clave que ha generado.
De esta forma Alice está enviando dos cosas, la clave encriptada con la pública de bob, y la información encriptada con la clave que ha generado la propia Alice.

Como contesta Bob?
