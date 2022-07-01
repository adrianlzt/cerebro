Para obtener las values que se pueden configurar de un chart:
helm show values elastic/eck-operator


Referenciando values dentro de ficheros de values:
foo: bar
baz: "{{ tpl .Values.foo . }}"
