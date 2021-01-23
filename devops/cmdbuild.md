CMDB opensource

# Desarrollo
Código en un .tar.gz en sourceforge

Hacen falta unas dependencias:
https://bitbucket.org/tecnoteca/cmdbuild-dependencies/downloads/
Descomprimir e instalarlas:
bash install-artifacts.sh

Copiar los que están copiados localmente al dir de ~/.m2 (como si estuviese bajado localmente)
rsync -a . /home/adrian/.m2/repository/

Compilar shark-ws-plain y copiar al war donde lo busca cmdb:
cd /home/adrian/.m2/repository/net/sourceforge/sharkwf/shark-ws-plain
mvn package
cp target/shark-ws-plain-4.4-1.war 4.4-1/shark-ws-plain-4.4-1.war

cp /home/adrian/Documentos/cmdbuild/cmdbuild-3.2.1/shark/extensions/target/cmdbuild-shark-extensions-3.2-DEV-SNAPSHOT.jar /home/adrian/.m2/repository/org/cmdbuild/cmdbuild-shark-extensions/3.2-DEV-SNAPSHOT/cmdbuild-shark-extensions-3.2-DEV-SNAPSHOT.jar

mkdir -p /home/adrian/.m2/repository/org/cmdbuild/cmdbuild-utils-lang/3.2-DEV-SNAPSHOT/
cp ../cmdbuild-3.2.1/utils/lang/target/cmdbuild-utils-lang-3.2-DEV-SNAPSHOT.jar /home/adrian/.m2/repository/org/cmdbuild/cmdbuild-utils-lang/3.2-DEV-SNAPSHOT/cmdbuild-utils-lang-3.2-DEV-SNAPSHOT.jar

mkdir -p /home/adrian/.m2/repository/org/cmdbuild/cmdbuild-utils-io/3.2-DEV-SNAPSHOT/ /home/adrian/.m2/repository/org/cmdbuild/cmdbuild-client-rest/3.2-DEV-SNAPSHOT/ /home/adrian/.m2/repository/org/cmdbuild/cmdbuild-utils-postgres/3.2-DEV-SNAPSHOT /home/adrian/.m2/repository/org/cmdbuild/cmdbuild-core-configdefs/3.2-DEV-SNAPSHOT
cp utils/io/target/cmdbuild-utils-io-3.2-DEV-SNAPSHOT.jar /home/adrian/.m2/repository/org/cmdbuild/cmdbuild-utils-io/3.2-DEV-SNAPSHOT/; cp client/rest/target/cmdbuild-client-rest-3.2-DEV-SNAPSHOT.jar /home/adrian/.m2/repository/org/cmdbuild/cmdbuild-client-rest/3.2-DEV-SNAPSHOT/; cp utils/postgres/target/cmdbuild-utils-postgres-3.2-DEV-SNAPSHOT.jar /home/adrian/.m2/repository/org/cmdbuild/cmdbuild-utils-postgres/3.2-DEV-SNAPSHOT; cp core/configdefs/target/cmdbuild-core-configdefs-3.2-DEV-SNAPSHOT.jar /home/adrian/.m2/repository/org/cmdbuild/cmdbuild-core-configdefs/3.2-DEV-SNAPSHOT/

vi pom.xml
  quitar los utils/bugreportcollector y utils/alfresco-migrator

instalar "sencha-cmd" (necesitamos el binario "sencha")
http://cdn.sencha.com/cmd/6.2.2/no-jre/SenchaCmd-6.2.2-linux-amd64.sh.zip

Tras instalarlo le paso el path:
export PATH=/home/adrian/Documentos/Sencha/Cmd/6.2.2.36/:$PATH

mvn clean install

Fallan los tests de cmdbuild-test-core
Tests in error:
  GeoAttributeIT.createDeleteGeoAttribute@org.cmdbuild.test.core.getEmptyDb » Runtime
  GeoAttributeIT.createGeoAttribute@org.cmdbuild.test.core.getEmptyDb » Runtime ...
  GeoStyleRulesIT.testGeoStyleRules@org.cmdbuild.test.core.getEmptyDb » Runtime ...
  GeoStyleRulesIT.testGeoStyleRulesParamsCreateUpdate@org.cmdbuild.test.core.getEmptyDb » Runtime
  GeoStyleRulesIT.testGeoStyleRulesWithFunction@org.cmdbuild.test.core.getEmptyDb » Runtime
  GisValueIT.testGisValueWithNavTree:86->createGeoAttribute:165 » UncategorizedSQL

Ignoramos y saltamos el resto de tests:
mvn install -rf :cmdbuild-main

No me queda muy claro que he terminado haciendo, pero parece que estoy usando la version 3.2, no la 3.2.1


Recompilar solo un módulo:
mvn package -pl :cmdbuild-services-rest-v3

Meter el .jar nuevo en un .war ya existente de cmdbuild
