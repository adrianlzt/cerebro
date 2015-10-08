https://docs.pnp4nagios.org/pnp-0.6/pages

“pages” provide the opportunity to collect graphs of different hosts/services on one page. That way - as an example - you can display the traffic rates of all tape libraries.


http://10.95.83.172/pnp4nagios/page


Ejemplo, una pagina con todas las gráficas de disco de la partición "/" de las máquinas master:

define  page  {
        use_regex 1
        page_name Webserver Disk
}

#
# Define the first Graph
#
define graph {
        host_name       ^.*master.*$  # Every host starting with 'websrv'
        service_desc    ^disk      # Every service starting with 'traffic'
        source          0             # OPTIONAL Show only the first image
}

