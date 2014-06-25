http://ruby-doc.org/core-1.9.3/Regexp.html

irb(main):042:0> log
=> "[   35.383513] bridge-wlan1: up"
irb(main):043:0> log.match(/] ([a-z]+)-/i)
=> #<MatchData "] bridge-" 1:"bridge">
irb(main):044:0> log.match(/] ([a-z]+)-/i)[0]
=> "] bridge-"
irb(main):045:0> log.match(/] ([a-z]+)-/i)[1]
=> "bridge"


If a block is given, invoke the block with MatchData if match succeed, so that you can write

str.match(pat) {|m| ...}
instead of

if m = str.match(pat)
  ...
end


# Array, busqueda
re = /\A#{Regexp.escape(str)}\z/i # Match exactly this string, no substrings
all = array.grep(re)              # Find all matching strings…
any = array.any?{ |s| s =~ re }   #  …or see if any matching string is present


re = /ESJC-DSMM-WS01P/
  busca exactamente esa cadena
re = /^esjc-ostt-cn11d.*/
  busca una cadena que empieze por eso
re = /^eSJc-osTT-cn11D.*/i
  busca una cadena que empieze por eso, da igual el 'case'

Meter variables dentro

re = /^#{a}.*/i

all_node_names.grep(re)
  no devuelve los elementos que matcheen
