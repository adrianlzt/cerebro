puppet agent --test
Para forzar la ejecución del agente

Ejecutar puppet sin realizar cambios
puppet agent -t --noop


puppet agent -t --environment=pro


puppet agent -t --summarize
  En vez de lo que hace nos saca un resumen de lo que ha pasado, tiempos, cambios, eventos, etc
