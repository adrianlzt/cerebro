https://github.com/hakimel/reveal.js

Para crear presentaciones con html+javascript
Ejemplos: https://github.com/hakimel/reveal.js/wiki/Example-Presentations


Editor online: https://slides.com


Para mostrar una presentación a partir de un gist (el fichero dentro del gist debe ser .html):
http://gist-reveal.it/ID_DE_UN_GIST


# Docker #
A docker image that helps facilitate open source slideshow authoring by templating gist.github.com content using reveal.js
https://github.com/ryanj/gist-reveal.it
docker run -d -p 80:8080 ryanj/gist-reveal.it
http://localhost/ID_DE_UN_GIST

También se le puede pasar un Google Analitycs tracker:
docker run -e "GA_TRACKER=GA-12345678" ryanj/gist-reveal.it

Podemos hacer retransmisión en vivo de las slides.
Cualquier usuario que entre en la presentación, se moverán como las mueva el presentador.
Para ser presentador: http://192.168.1.36/?setToken=adrian
docker run -p 80:8080 -e "REVEAL_WEB_HOST=192.168.1.36" -e "REVEAL_SOCKET_SECRET=adrian" ryanj/gist-reveal.it
CUIDADO! parece que la app tiene un límite y github te limita las peticiones cuando llevas bastantes.




Podemos usar slid.es (slides.com) para generar la presentación, pero al pegar, quitar el primer div (<div class="slides">)

Con html:
<section>
  <h2>Broadcasting Your</h3>
  <h1>Reveal.js</h1>
  <h2>Slideshow Presentations</h2>
</section>
 
<section>
  Balbalblab
</section>

Con markdown: 
<section data-markdown>
    <script type="text/template">
        ## Page title
 
        A paragraph with some text and a [link](http://hakim.se).
    </script>
</section>
<section data-markdown>
    <script type="text/template">
        ## Otra pagina
 
        Esta sin nada.
    </script>
</section>
