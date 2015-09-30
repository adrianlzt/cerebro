(where (state "error")


(where (= (:type event) "evolution")


(where (service "www")
  (notify-www-team)
    (else
        (notify-misc-team)))


(where (description #"an+elids") ...)


(where (>= (* metric 1000) 2.5))


(where (< 5 metric 10))


(where (not (or (tagged "www")
                (and (state "ok") (nil? metric)))))
