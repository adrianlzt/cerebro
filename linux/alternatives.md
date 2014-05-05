Sistema para tener varias opciones para un mismo binario.

Por ejemplo con java.
/usr/bin/java -> /etc/alternatives/java
/etc/alternatives/java -> /usr/lib/jvm/java-7-openjdk-amd64/jre/bin/java

Pero tenemos más alternativas:
update-alternatives --display java

Para meter una nueva:
update-alternatives --install /usr/bin/java java /usr/local/java/jre1.7.0_55/bin/java 10

Siendo lo último la prioridad (más prioritario cuanto mayor es el número)



Borrar una entrada
update-alternatives --remove java /usr/local/java/jre1.7.0_55/bin/java
