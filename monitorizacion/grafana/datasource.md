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


El ejemplo completo cuando tenemos la respuesta en una promesa:
getOptions(query) {
  let metrics = this.datasource.metricFindQuery(query || '');
  let variables = this.datasource.templateSrv.variables;
  return metrics.then(
    function (result) {
      console.log("dentro de la promesa. result=");
      console.dir(result);
      _.forEach(variables, variable => {
        console.log("añade variable " + variable);
        result.unshift({text: '$' + variable.name, value: '$' + variable.name});
      });
      console.log("tras añadir las variables");
      console.dir(result);
      return result;
    },
    function(error) {
      console.log("error promise: " + error);
    }
  );
}


Substitución de variables por los valores que defina el template
var host = this.templateSrv.replace(options.annotation.host, options.scopedVars, 'regex');
var host = this.templateSrv.replace(options.annotation.host, {}, 'glob');

La primera nos generará, para varios hosts: (hostA|hostB)
El segundo: {hostA,hostB}
