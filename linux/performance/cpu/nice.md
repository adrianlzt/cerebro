Nice = amabilidad, cuanto de amable va a ser un proceso con el resto

nice <CMD>      # ejecuta con prioridad modificada (para OTHER)
  -n 19           # minima
  -n -20          # maxima (root)

Un usuario normal solo puede reducir la prioridad.

renice <PID>    # modifica prioridad
  -n 19           # minima
  -n -20          # maxima (root)


Si tenemos autogrupos activados (grep CONFIG_SCHED_AUTOGROUP=y /boot/config*) nice solo afectará a procesos del mismo autogrupo.
