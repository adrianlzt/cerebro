http://yogthos.github.io/ClojureDistilled.html
Writing Code That Writes Code

Macros execute before compile time and the compiler sees the result of macro execution.

Because of this level of indirection, macros can be difficult to reason about, and thus it's best not to use them when a function will do the job.


Definir macro:
(defmacro defprivate [name args & body]
  `(defn ~(symbol name) ~args
     (if (:user @session)
       (do ~@body)
       "please log in")))



Usamos la macro para crear una funcion:
(macroexpand-1 '(defprivate foo [greeting] (println greeting)))



Como verá el compilador la nueva función creada a partir de la macro:
(clojure.core/defn foo [greeting]
  (if (:user (clojure.core/deref session))
    (do (println greeting))
    "please log in"))


Escrito más claro:
(defn foo [greeting]
  (if (:user @session)
    (do (println greeting))
    "please log in"))


Ahora podríamos definir más funciones que solo escribiran mensajes en caso de que el user esté logado:
(defprivate foo [message] (println message))

(foo "this message is private")
