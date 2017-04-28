warning/ApiListener: Ignoring config update for unknown zone 'director-global'
Si veo esto en un cliente de icinga es que le falta esa zona.
Lo podemos arreglar metiendo en la conf del cliente:
echo 'object Zone "director-global" { global = true }' >> /etc/icinga2/zones.conf
systemctl restart icinga2



wmax (250) cannot be greater than cmax
Me aparece en un nodo en todos sus check_procs
Bug?
