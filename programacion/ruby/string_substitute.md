http://ruby-doc.org/core-2.0/String.html#method-i-sub

irb(main):011:0> "manolo".sub(/a([no]+)/) do "XXX #{$1} XXXX" end
=> "mXXX no XXXXlo"


