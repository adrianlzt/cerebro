https://docs.influxdata.com/kapacitor/v0.10/tick/u_d_f_node/
https://github.com/influxdata/kapacitor/tree/master/udf/agent/

Ejemplos de agentes:
https://github.com/influxdata/kapacitor/tree/master/udf/agent/

Podemos crear user defined functions para usarlas en el lenguaje TICK.

Por ejemplo:
     stream
         .from()...
         .movingAverage()
             .field('value')
             .size(100)
             .as('mavg')
         .httpOut('movingaverage')

Donde "movingAverage()" estará llamando a un agent UDF (no es trivial crearlos):
  [udf]
    [udf.functions]
        # Example moving average UDF.
        [udf.functions.movingAverage]
            prog = "/path/to/executable/moving_avg"
            args = []
            timeout = "10s"

