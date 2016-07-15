https://github.com/pyr/riemann-extra


(def thresholds
  {"cpu-user" {:warning 30 :critical 60}
   "cpu-system" {:warning 30 :critical 60}
   "cpu-idle2" {:warning 50 :critical 50 :invert true}
   "cpu-nice" {:warning 50 :critical 20}   
   "cpu-idle" {:warning 50 :critical 20 :invert true}
   "cpu-idle3" {:warning 50 :critical 20 :invert true}
   "cpu-steal" {:warning 50 :critical 20}})

(require '[org.spootnik.riemann.thresholds :refer [threshold-check]])

(streams
  (smap (threshold-check thresholds)
     prn))
