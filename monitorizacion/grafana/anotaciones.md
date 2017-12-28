Si queremos meter un link podemos meter código HTML en el campo text.

Si queremos múltiples tags las separaremos con comas.

Annotations can now use a template variable as data source (https://github.com/grafana/grafana/issues/5054)

SELECT * FROM tabla WHERE $timeFilter


A partir de 4.6 podemos meter anotaciones a mano usando control+click
http://docs.grafana.org/reference/annotations/


# PR para que funcione el multiple tag con influx
https://github.com/grafana/grafana/pull/4550

parece que se hace una query
annotationQuery
  la query:           var query = {range: range, rangeRaw: rangeRaw, annotation: annotation};

https://github.com/grafana/grafana/blob/ee92fee2123b73b32e245c23fb53dda7c9b7feb6/public/app/plugins/datasource/influxdb/datasource.ts#L103
el procesador de la query

El procesador de la query termina con:
      return new InfluxSeries({series: data.results[0].series, annotation: options.annotation}).getAnnotations();

    return this._seriesQuery(query).then(data => {
      if (!data || !data.results || !data.results[0]) {
        throw { message: 'No results in response from InfluxDB' };
      }
      return new InfluxSeries({series: data.results[0].series, annotation: options.annotation}).getAnnotations();
    });

Es definición de InfluxSeries es:
https://github.com/grafana/grafana/blob/37ff432f9db716930f9247c0c71286eac053c002/public/app/plugins/datasource/influxdb/influx_series.js#L8
  function InfluxSeries(options) {
    this.series = options.series;
    this.alias = options.alias;
    this.annotation = options.annotation;
  }

los resultados se pasan a receiveAnnotationResults y este a addAnnotation

Parece que el problema es que receiveAnnotationResults no tiene la variable "tags" cuando definimos varias.

https://github.com/grafana/grafana/blob/c465e594d79a2890fef0b401e528a2c011b75dbb/public/app/features/annotations/annotations_srv.js#L66
->
https://github.com/grafana/grafana/blob/c465e594d79a2890fef0b401e528a2c011b75dbb/public/app/features/annotations/annotations_srv.js#L74



Creo que el problema esta aquí
https://github.com/grafana/grafana/blob/37ff432f9db716930f9247c0c71286eac053c002/public/app/plugins/datasource/influxdb/influx_series.js#L92
Esta linea no funciona, porque está comparando
"otro" == "status,otro"

c.annotation.tagsColumn.includes("otro")

https://github.com/grafana/grafana/blob/37ff432f9db716930f9247c0c71286eac053c002/public/app/plugins/datasource/influxdb/influx_series.js#L101

Si paro en esta linea la ejecucción y cambio el valor (por ejemplo "Finished") por "Finished,Pepe", ahora siempre que muestre el contenido veré las dos tags.

se intenta coger annotation["nombre columna"] y como hay dos peta
Esto se ejecuta cuando refrescamos y/o cambiamos el timespan. NO cuando pasamos por encima de la anotación
