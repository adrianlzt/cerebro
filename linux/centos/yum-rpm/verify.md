http://bencane.com/2013/12/23/yum-plugins-verifying-packages-and-configurations-with-yum-verify/

The verify plugin is the main reason I wanted to write this article. It adds the ability for yum to validate that installed packages are "intact" per the packages specification. As an example if you suspected that the permissions of a configuration file are modified or a binary was removed. You could simply run yum verify-all to identify if that configuration was modified outside of the packages specifications. This can be extremely useful when troubleshooting a broken server.

# Instalacion
yum install yum-plugin-verify

# Verificar todo
yum verify-all

# Verificaar paquete
yum verify NOMBRE

Creo que también vale:
rpm -V pkg



Ejemplo de salida:
grep.x86_64 : Pattern matching utilities
    File: /bin/egrep
        Problem:  mode does not match
        Current:  user:wrx, group:wrx, other:wrx
        Original: user:wrx, group:-rx, other:-rx


5:00 en chequear 372 paquetes (2 vcpu, 4GB RAM)
5:04 en chequear 609 paquetes (1 vcpu, 2GB RAM)




# Con el comando RPM:
https://www.novell.com/coolsolutions/feature/16238.html

Salida mas críptica

Verificar todo:
rpm -Va

Un paquete:
rpm -V NOMBRE

Un rpm:
rpm -V fichero.rpm

Si queremos ver cuales eran los valores originales:
rpm -qlv NOMBRE


0:41 en chequear 372 paquetes (2 vcpu, 4GB RAM)
0:58 en chequear 609 paquetes (1 vcpu, 2GB RAM)


Ejemplo de salida:
S.5....T c /etc/isdn/isdn.conf

Explicación de los primeros caracteres:
  S file Size differs
  M Mode differs (includes permissions and file type)
  5 MD5 sum differs
  D Device major/minor number mis-match
  L readLink(2) path mis-match
  U User ownership differs
  G Group ownership differs
  T mTime differs

Explicación del carácter antes del fichero:
  c %config configuration file.
  d %doc documentation file.
  g %ghost file (i.e. the file contents are not included in the package payload).
  l %license license file.
  r %readme readme file.



# Arreglar permisos / usuarios
rpm --setugids --setperms NOMBRE

Reset the permissions of the all installed RPM packages
for p in $(rpm -qa); do rpm --setugids --setperms $p; done
  Ejecutar en el orden aquí descrito.
  Si ejecutamos primero el setugids los permisos pueden no ser los correctos en caso de ficheros setsuid.
  El /usr/bin/sudo por ejemplo lo pone a 0111/root:root
  El setperms luego lo arregla para dejarlo a 4111/root:root

Estos comandos pueden dar fallos al intentar arreglar los permisos/usuarios de un fichero que está borrado.


# Recuperar ficheros de conf originales
Si queremos que un fichero de conf sea el del rpm.
rm /etc/fichero.conf
yum reinstall pkg
