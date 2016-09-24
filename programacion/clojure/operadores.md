# ->>
http://clojuredocs.org/clojure.core/-%3E%3E

user=> (def c 5)
user=> (->> c (+ 3) (/ 2) (- 1))
3/4

;; and if you are curious why
user=> (use 'clojure.walk)
user=> (macroexpand-all '(->> c (+ 3) (/ 2) (- 1)))
(- 1 (/ 2 (+ 3 c)))


# ' / quote
http://clojuredocs.org/clojure.core/quote

'form ⇒ (quote form)

Se pone para pasar lo siguiente tal cual, sin procesar:
user> (quote (println "foo"))
(println "foo")


# syntax_quote / `
https://8thlight.com/blog/colin-jones/2012/05/22/quoting-without-confusion.html

Parecido al quote, aunque si que hace algunas cosas.
La más útil, permitirnos hacer unquote:

user=> `(this ~(symbol (str "i" "s" \- "cool")))
(user/this is-cool)


# unquote / ~
user => `(1 ~(dec 3) 3)
(1 2 3)

