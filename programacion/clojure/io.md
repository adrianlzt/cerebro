http://stackoverflow.com/a/19297746

(defn copy-uri-to-file [uri file]
  (with-open [in (clojure.java.io/input-stream uri)
              out (clojure.java.io/output-stream file)]
    (clojure.java.io/copy in out)))

Mirar ejemplo de adjuntar una imagen a un email en email.md
