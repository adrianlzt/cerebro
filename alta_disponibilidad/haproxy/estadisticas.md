Habilitar la interfaz administrativa

listen haproxy.stats
  bind 0.0.0.0:9000
  mode http
  stats enable
  stats uri /
  #stats auth admin:passwordhere

  #balance
  #timeout client 5000
  #timeout connect 4000
  #timeout server 30000

  #This is the virtual URL to access the stats page
  #stats uri /haproxy_stats 

  #Authentication realm. This can be set to anything. Escape space characters with a backslash.
  #stats realm HAProxy\ Statistics 

  #The user/pass you want to use. Change this password!
  #stats auth admin:passwordhere   

  #This allows you to take down and bring up back end servers.
  #This will produce an error on older versions of HAProxy.
  #stats admin if TRUE

  # Add your custom health check monitoring failure condition here.
  # monitor fail if <condition>



Obtener estadísticas en formato csv:
curl "ip:port/;csv"
