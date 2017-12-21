# Crear nuestro propio datasource

https://github.com/grafana/simple-json-datasource
Ejemplo de un datasource generico

Ejemplo de backends para ese datasource genérico
javascript: https://github.com/bergquist/fake-simple-json-datasource
go: https://github.com/smcquay/jsonds
python: https://gist.github.com/linar-jether/95ff412f9d19fdf5e51293eb0c09b850
  pip install flask_cors pandas


Para decidir que campos se muestran en los dropdown el código html llama a una función (getOptions por ejemplo) que le debe devolver un array tipo:
metrics = [{text: "uno", value: "uno"},{text: "dos", value: "dos"}];

Si queremos añadir las variables de template a nuestros dropdown:
https://github.com/alexanderzobnin/grafana-zabbix/blob/02d8748d33cd76209f30f0d6bd9acc1602bdb8a2/src/datasource-zabbix/query.controller.js#L137
    // Add template variables
    _.forEach(this.templateSrv.variables, variable => {
      metrics.unshift('$' + variable.name);
    });

