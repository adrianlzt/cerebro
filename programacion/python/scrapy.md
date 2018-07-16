http://scrapy.org/
xpath.md
mirar ~/priv-adrianRepo/programacion/python/LEARNING_SCRAPY.pdf
UI: https://github.com/scrapinghub/portia

An open source and collaborative framework for extracting the data you need from websites.
In a fast, simple, yet extensible way.

Nos permite de forma sencilla extraer información de webs HTML.


pip install scrapy


Ejemplo extrayendo el campo "value" de un "<input>" de nombre "RANDOM"
from scrapy.selector import Selector
Selector(text=r.text).xpath('//input[contains(@name, "RANDOM")]/@value').extract()[0]

Buscar por un campo con expresion regular:
>>> Selector(text=r_index.text).xpath('//form[re:test(@action, "/BEWeb/3025/I025/not9765_d_COMUN.*")]')



vias = Selector(text=r.text).xpath('//tr[@class="Height20"]')
for v in vias:
  print(v.xpath('string(td[last()]/nobr)').extract()[0].lstrip('\xa0'))
