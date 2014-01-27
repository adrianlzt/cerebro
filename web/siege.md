Pruebas de carga sobre web:

siege -c 10 -t 0 http://ec2-54-242-37-129.compute-1.amazonaws.com/pi.php
  
  -c 10: 10 peticiones concurrentes
  -t 0: corre durante tiempo infinito
  -t 20S: corre durante 20 segundos (M: minutos, H: horas)
  url a testear
