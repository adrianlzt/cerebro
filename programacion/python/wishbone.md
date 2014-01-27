https://wishbone.readthedocs.org/en/latest/introduction.html

Wishbone is a Python library to create IO driven event processing servers by defining a pipeline of inputs and outputs with a number of intermediate processing stages in between through which events travel.

Obtenemos datos de entrada (server gearman, AMQP, http request, tcp, udp...), lo pasamos por un router que tiene definidos ciertos "flows", y pasamos la salida a los mismos conectores de la entrada.

Ejemplos de flows:
  roundrobin
  fanout: 1 objeto de entrada a n salidas
  funnel: n entradas a 1 salida
  tippingbucket: buffer data y la saca según unas condiciones 
  lockbuffer: buffer para ir pasando eventos a la salida, si se pasa un límite, se tiran los nuevos eventos que lleguen

