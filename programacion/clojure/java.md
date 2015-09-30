http://yogthos.github.io/ClojureDistilled.html
Calling Out to Java


# Importar clases
(ns myns
  (:import java.io.File))


(ns myns
  (:import [java.io File FileInputStream FileOutputStream]))


# Instanciar clases
(new File ".")
o más corto:
(File. ".")


# Llamar a métodos
(let [f (File. ".")]
  (println (.getAbsolutePath f)))

El punto indica que el método no es de Clojure.

Si queremos referencias métodos estáticos usamos la barra (/)
(str File/separator "foo" File/separator "bar")

(Math/sqrt 256)


Para encadenar varias llamadas:

(.getBytes (.getAbsolutePath (File. ".")))

Sería equivalente a:

(.. (File. ".") getAbsolutePath getBytes)
