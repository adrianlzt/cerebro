# Service
service riemann start

# A mano
riemann /etc/riemann/riemann.config

Si usamos reload:
If you make a mistake, like a syntax error, Riemann will continue running with the old config and won't apply the new one
Reload es experimental. Para asegurarnos que no haya problemas, usar let en vez de def (tampoco usar defn)
