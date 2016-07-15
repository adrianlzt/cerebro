https://clojuredocs.org/clojure.java.shell/sh
(require '[clojure.java.shell :as shell])

(shell/sh "/bin/touch" "/tmp/fichero")

