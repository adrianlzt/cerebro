http://ruby-doc.org/core-2.0.0/String.html

irb(main):008:0> "adrian".capitalize
=> "Adrian"
irb(main):009:0> "adrian".reverse
=> "nairda"
irb(main):010:0> "adrian".length
=> 6
irb(main):011:0> "adrian" * 5
=> "adrianadrianadrianadrianadrian"


irb(main):030:0> poema = "esto erase una vez un poema en ruby"
=> "esto erase una vez un poema en ruby"
irb(main):031:0> poema['una'] = "UNooo"
=> "UNooo"
irb(main):032:0> poema
=> "esto erase UNooo vez un poema en ruby"

irb(main):033:0> lineas = "esta es una\nesta es otra\nyotra mas"
=> "esta es una\nesta es otra\nyotra mas"
irb(main):034:0> print lineas
esta es una
esta es otra
yotra mas=> nil
irb(main):035:0> lineas.lines
=> #<Enumerator: "esta es una\nesta es otra\nyotra mas":lines>
irb(main):036:0> lineas.lines.to_a
=> ["esta es una\n", "esta es otra\n", "yotra mas"]
irb(main):037:0> lineas.lines.to_a.reverse
=> ["yotra mas", "esta es otra\n", "esta es una\n"]
irb(main):038:0> lineas.lines.to_a.reverse.join
=> "yotra masesta es otra\nesta es una\n"
irb(main):039:0> print lineas.lines.to_a.reverse.join
yotra masesta es otra
esta es una
=> nil

"unas palabras mas".include? "palabras"
=> true
> "unas palabras mas".include? "palab"
=> true

irb(main):052:0> "unas palabras mas".upcase
=> "UNAS PALABRAS MAS"
irb(main):053:0> "unas palabras mas".downcase
=> "unas palabras mas"

irb(main):027:0> nombre, cosa = "adrian: como estas".split(": ")
=> ["adrian", "como estas"]
irb(main):028:0> nombre
=> "adrian"
irb(main):029:0> cosa
=> "como estas"

irb(main):034:0> "  hola  ".strip
=> "hola"

Para String.match mirar regexp.md
