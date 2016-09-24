https://clojuredocs.org/clojure.core/case

(let [mystr "no match"]
  (case mystr
        "" 0
        "hello" (count mystr)
        "default"))
;;=> "default"
