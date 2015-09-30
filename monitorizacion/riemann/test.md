http://riemann.io/howto.html#writing-tests

(let [index (default :ttl 3 (tap :index (index)))]
  (streams
    (expired #(prn "Expired" %))
      (where (not (service #"^riemann "))
        index)))

(tests
  (deftest index-test
    (is (= (inject! [{:service "test"
                      :time    1}])
           {:index [{:service "test"
                     :time    1
                     :ttl     3}]}))))

inject! mete ese evento en el stream
Luego inject! nos devuelve el evento que pasa por tap (creo)

riemann test riemann.config

No me queda claro que parte testea y que parte es injectada.
El tema es que se coge el evento que pasa por el tap que hemos definido.

