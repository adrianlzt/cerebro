http://logs.lazybot.org/irc.freenode.net/%23riemann/2013-04-01.txt

Attributes work differently at the logical and protocol level.
In protobufs, they're encoded as an "attributes" map
But in Riemann, they're just fields on the event itself
so if you have a custom attribute "cat" with value "meow", you can get it with
(:cat event)
(where (= (:cat event) "meow")
alternatively
(where* #(= "meow" (:cat %)))
