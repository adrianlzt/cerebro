Sacar los mensajes por consola:
<filter **>
  @type stdout
</filter>

Usar stdout como output:
<match **>
  @type stdout
</match>


# Varios output
https://docs.fluentd.org/v0.12/articles/out_copy
Podemos usar el plugin "copy" para enviar la info a varios outputs diferentes:

<match pattern>
  @type copy
  <store>
    @type file
    path /var/log/fluent/myapp1
    ...
  </store>
  <store>
    ...
  </store>
  <store>
    ...
  </store>
</match>

