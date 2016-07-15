Añadir trazas en la configuracion:

(streams
  ...
  #(info "traza" %))

#(info %) expands into (fn [x] (info x))

Creamos la función anónima que pondrá la cadena de texto que le digamos más un dump del objeto

(streams
  (where (service "bar")
    ; Print event to stdout
    prn

    ; Print :foo, then the event
    #(prn :foo %)

    ; Log event to the logfile and stdout
    #(info %)

    ; Log event using the same representation as prn
    #(info (pr-str %))

    ; Log some specific fields
    #(info (:service %) (:metric %))

(expired #(warn "expired" %))


# Troubleshooting
(streams
  #(info %) ; First, measure here
  (where (service #"^riak .+")
    #(info %) ; Then move the info stream here to check the filter
    (by :service
      (coalesce
        #(info %) ; Third, check the coalesced vector of events
        (smap folds/maximum
          #(info %) ; Fourth, probe here to check the maximum calculation
          (with :host nil
            #(info %) ; Finally, check exactly what events are being applied
                      ; to the index.
            index))))))
