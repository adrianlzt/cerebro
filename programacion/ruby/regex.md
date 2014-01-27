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
