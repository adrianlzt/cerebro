https://collectd.org/wiki/index.php/Data_source
http://collectd.org/documentation/manpages/types.db.5.shtml

Se encuentran en /usr/share/collectd/types.db

Definen que tipos de datos podemos enviar con: vl.dispatch(values=[read_bytes,write_bytes])
Si defimos un tipo if_errors podríamos enviar dos datos, que significarian: 
if_errors               rx:DERIVE:0:U, tx:DERIVE:0:U

El significado de la definición de los tipos es:

ds-name:ds-type:min:max. ds-type may be either ABSOLUTE, COUNTER, DERIVE, or GAUGE. min and max define the range of valid values for data stored for this data-source. If U is specified for either the min or max value, it will be set to unknown, meaning that no range checks will happen.

GAUGE: se almacena el valor sin más
DERIVE: para datos que lo importante es la variación. Internamente se calcula el ratio con (VALUEnew-VALUEold)/(TIMEnew-TIMEold)

