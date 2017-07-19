http://www.appdynamics.com/

AppDynamics is application performance management software designed to help dev and ops troubleshoot problems in complex production apps

Parece que es muy buena, ya que en una encuesta (http://blog.dataloop.io/2014/01/30/what-we-learnt-talking-to-60-companies-about-monitoring/) todas las empresas desearían poder usarla, si pudiesen pagarla.

Podemos usarlo como SaaS (agentes instalado enviando info a sus servers) o On-Premises, instalando una copia de su server en nuestro entorno y los agentes enviando a este server.


# Controller on-premises
Te baja un .zip con un instalador (.sh) y una licencia (.lic)

Mirando el instalador:
Parece que usa:
 java
 compiz
 un fichero .tar.gz en los ultimos 57775122 bytes. Contenido:
   i4j_extf_4_3tcf3t.txt
   i4jparams.conf
   i4j_extf_2_3tcf3t_1s8j7eq.png
   stats.properties
   user.jar
   user
   user/mysql-connector-java-5.1.38.jar
   user/ant.jar
   user/httpclient-4.5.2.jar
   user/httpcore-4.4.6.jar
   user/commons-io-2.4.jar
   user/commons-logging-1.2.jar
   MessagesDefault
   i4j_extf_0_3tcf3t.utf8
   i4j_extf_1_3tcf3t.utf8
   i4j_extf_3_3tcf3t_1qapioz.png
   jre.tar.gz
   i4jruntime.jar

  contiene un JRE de java entero
  Parece que podemos especificar uno que tengamos en el sistema con INSTALL4J_JAVA_HOME (o lo intenta detectar tal vez?)

  La aplicación parece que es el user.jar

Requisitos de hardware:
https://docs.appdynamics.com/display/PRO41/Controller+System+Requirements

Dependencias necesarias para instalar:
libaio - Linux kernel AIO access library - development files


Si ejecutamos el sh:
Unpacking JRE ...
Preparing JRE ...
Starting Installer ...
This will install AppDynamics Controller on your computer.
OK [o, Enter], Cancel [c]


Lo que hace es desempaquetar un JRE para luego correr:
controller_64bit_linux-4.3.3.6.sh.20.dir/jre/bin/java -Dinstall4j.jvmDir=/mnt/controller_64bit_linux-4.3.3.6.sh.20.dir/jre -Dexe4j.moduleName=/mnt/controller_64bit_linux-4.3.3.6.sh -Dexe4j.totalDataLength=824927423 -Dinstall4j.cwd=/mnt -Djava.ext.dirs=/mnt/controller_64bit_linux-4.3.3.6.sh.20.dir/jre/lib/ext:/mnt/controller_64bit_linux-4.3.3.6.sh.20.dir/jre/jre/lib/ext -Dsun.java2d.noddraw=true -Di4j.vmov=true -Di4j.vmov=true -Di4j.vmov=true -Di4j.vmov=true -Di4j.vmov=true -Di4j.vpt=true -classpath i4jruntime.jar:user.jar:user/ant.jar:user/commons-io-2.4.jar:user/commons-logging-1.2.jar:user/httpclient-4.5.2.jar:user/httpcore-4.4.6.jar:user/mysql-connector-java-5.1.38.jar com.install4j.runtime.launcher.Launcher launch com.install4j.runtime.installer.Installer false false   false true false  true true 0 0  20 20 Arial 0,0,0 8 500 version 4.3.3.6 20 40 Arial 0,0,0 8 500 -1


Instalacion por defecto:
/usr/local/appdynamics/controller

The database root user is the superuser account that has all the privileges
necessary to administer the AppDynamics Controller database. You will need
this password to perform AppDynamics Controller upgrades in the future
Puesta a "root"

Nos pide el nombre del server donde conectarán los agentes. Los agentes conectarán con el master, por defecto, en el puerto 8090
Database server port: 3388
Application server admin port: 4848
Application Server JMS Port [7676]
Application Server IIOP Port [3700]
Application Server SSL Port [8181]
Events Service REST API Port [9080]
Events Service REST API Admin Port [9081]
Events Service Elastic Search Port [9200]
Reporting Service HTTP Port [8020]
Reporting Service HTTPS Port [8021]


Single Tenancy (un único usuario) o Multi Tenancy (gestion de usuarios y cuentas).
Puesto multi tenancy

Set a password for the AppDynamics Controller root user 
The AppDynamics Controller root user is the built-in user with system wide
privileges in the Controller application. You will use the root user
credentials to log into the System Administration Console. The root user
also enables the administration of all the tenants (also known as accounts)
in the Controller when the Controller is installed in multi-tenant mode.
Note: The same password will be used for administering the Controller
Puesto "rootcontroller"


Crear una account inicial:
name: default
Account Access Key 66d4b7c2-6f8e-4418-bf8f-2cb30f494aff 
user: duser
pass: duser
