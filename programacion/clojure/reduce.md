https://clojuredocs.org/clojure.core/reduce

(reduce + [1 2 3 4 5])  ;;=> 15
(reduce + [])           ;;=> 0
(reduce + 1 [])         ;;=> 1
(reduce + 1 [2 3])      ;;=> 6

;; converting a vector to a set
(reduce conj #{} [:a :b :c])
;;=> #{:a :c :b}


