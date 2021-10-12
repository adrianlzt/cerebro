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



# SQL

## Campos
https://usermanual.wiki/Document/CMDBuildTechnicalManualENGV240.1276356727/help
Status, character(1), logical state of the record (A = active, deleted = N, U = updated)


## Queries

### Servidores que tienen varios softwares con el mismo cmdline
select distinct
  ser."Code" as Server,
  array_agg(s."Code") as software
from
  "Software" s
  JOIN "Server" ser ON ser."Id" = s."Hardware"
WHERE
  (
    "CmdLine" is not null
    or "CmdLine" <> ''
  )
  and s."Status" = 'A'
  and ser."Status" = 'A'
GROUP BY
  ser."Code",
  "CmdLine"
HAVING
 count(*) > 1
;

Como la anterior, pero solo quedándonos con las copias antiguas de esas entradas repetidas (se considera antigua si tiene una fecha en CardUpdated más antigua)
WITH sw_with_dates AS ( /* obtener hosts con software que tenga cmd duplicado) */
  SELECT
    DISTINCT ser."Code" AS Server,
    s."Id" AS id,
    s."Code" AS swcode,
    cu."BeginDate" AS date,
    "CmdLine" AS cmdline
  FROM
    "Software" s
    JOIN "Server" ser ON ser."Id" = s."Hardware"
    JOIN "CardUpdate" cu ON cu."Code" :: bigint = s."Id"
  WHERE
    (
      "CmdLine" IS NOT NULL
      OR "CmdLine" <> ''
    )
    AND s."Status" = 'A'
    AND ser."Status" = 'A'
    AND cu."Status" = 'A'
  ORDER BY
    ser."Code"
),
group_server_cmdline AS ( /* order cada grupo server-cmdline por su fecha BeginDate de CardUpdate */
  SELECT
    Server,
    id,
    swcode,
    date,
    cmdline,
    substring(
      cmdline
      FROM
        1 FOR 30
    ) AS cmdline_cut,
    row_number() OVER (
      PARTITION BY cmdline, Server
      ORDER BY date desc
    ) AS rownum
  FROM
    sw_with_dates
), sw_dup_old AS (
SELECT
   id,swcode,date,Server,cmdline
FROM
  group_server_cmdline
WHERE
  rownum >= 2 /* solo quedarnos con los más antiguos de cada grupo */
ORDER BY
  date
)
select
 gs.id,gs.swcode,gs.date,gs.cmdline_cut
from
 group_server_cmdline gs
 join sw_dup_old sd ON gs.Server = sd.Server AND gs.cmdline = sd.cmdline
WHERE
 gs.rownum=1
ORDER BY
  date
;
