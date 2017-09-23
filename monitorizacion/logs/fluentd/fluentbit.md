http://fluentbit.io/
http://fluentbit.io/documentation/0.8/about/fluentd_and_fluentbit.html

Es como un fluentd pequeño con menos funcionalidad.
La idea es usarlo para dispositivos embedidos.
Puede leer de distintas fuentes y enviar a distintos outputs.
Su footprint es mucho menor (150KB vs 20MB de fluentd).

Puede extenderse con plugins escritos en Go.


Esquema de funcionamiento:

input -> parser -> filter -> buffer -> routing -> [out1, out2, out3]


# Input plugins
http://fluentbit.io/documentation/0.12/input/

# Output plugins
http://fluentbit.io/documentation/0.12/output/


# Crear plugins
https://github.com/fluent/fluent-bit/blob/master/GOLANG_OUTPUT_PLUGIN.md

Se pueden desarrollar plugins en golang para usarse en fluent bit.

Parece que la interfaz es funcional, aunque aún no se puede usar la config de fluent bit en los plugins de golang
https://github.com/fluent/fluent-bit/issues/298#issuecomment-309047967

Código de ejemplo:
https://github.com/fluent/fluent-bit-go

Un plugin de verdad escrito en go:
https://github.com/kubeup/fluent-bit-aliyun
