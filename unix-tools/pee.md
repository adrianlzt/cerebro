ps -ef | pee head tail

pee pasa el stdout de "ps -ef" a head y a tail.

Es como hacer algo parecido a:
ps -ef | head; ps -ef |tail
