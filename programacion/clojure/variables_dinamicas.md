http://yogthos.github.io/ClojureDistilled.html
Dynamic Variables

This technique can be useful when dealing with resources such as file streams, database connections, or scoped variables. In general, the use of dynamic variables is discouraged since they make code more opaque and difficult to reason about.


(declare ^{:dynamic true} *foo*)

(println *foo*)
=>#<Unbound Unbound: #'bar/*foo*>


La variable *foo* tendrá valor dentro de la funcion "with-foo":
(defn with-foo [f]
  (binding [*foo* "I exist!"]
    (f)))

(with-foo #(println *foo*)) =>"I exist!"
