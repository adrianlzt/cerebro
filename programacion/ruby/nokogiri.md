http://nokogiri.org/tutorials/parsing_an_html_xml_document.html

Parseador html



require 'rubygems'
require 'nokogiri'
require 'open-uri'

mf = Nokogiri::HTML(open("http://www.mountain-forecast.com/peaks/Matterhorn/forecasts/4478"))
mf.css("table[class=forecasts]").css("tr")[1].css("td")[1].text.strip

Accedo a la tabla con class=forecasts, al segundo <tr>, al segundo <tr> y obtengo el texto sin caracteres blancos al inicio o final.
