https://clojars.org/

Son como los pip de python


Bajar un jar:
wget https://clojars.org/repo/selmer/selmer/1.0.7/selmer-1.0.7.jar

Con maven creo que seria lo optimo:
http://stackoverflow.com/questions/10808898/install-jar-from-remote-repo-clojar


mvn -DgroupId=selmer -DartifactId=selmer -Dversion=1.0.7 dependency:get

Almacena las cosas en ~/.m2/repository

No me funciona con algunas cosas
