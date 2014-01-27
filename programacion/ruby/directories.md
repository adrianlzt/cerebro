http://ruby-doc.org/core-2.0.0/Dir.html

Dir.entries "/"   Muestra los ficheros y directorios de /

Dir["/*.txt"]     Solo los ficheros acabados en .txt (era el 'truco' de los corchetes que buscan lo que tengan dentro)


irb(main):031:0> Dir.glob("/tmp/pruebas-hiera/hiera/*/test.json")
=> ["/tmp/pruebas-hiera/hiera/bluevia/test.json", "/tmp/pruebas-hiera/hiera/m2m/test.json"]

