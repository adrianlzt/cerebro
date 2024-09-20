Amazon llama a las gestion de credenciales - IAM
Estos usuarios valen para todas las availability zones y regiones.

Para conseguir mis credenciales para poder acceder de forma remota:

Voy a la consola AWS: https://console.aws.amazon.com
Pincho sobre mi nombre -> Security Credentials: https://console.aws.amazon.com/iam/home?#users

Aqui puedo crear usuarios que tendrán acceso a AWS, pero sin acceso a la consola (si quiero darle acceso a la consola, tendré que definirle un password).
Lo que tengo que marcar es para que me genere un "access key" (por defecto).

Me dará la opción de bajarme un .csv con mis credenciales (User Name,Access Key Id,Secret Access Key)
El secret access key no perderlo, porque tendremos que borrar el usuario.


Tras crear el usuario iré a crear un grupo. Cada usuario heredará sus permisos de estos grupos. También se pueden asignar policies directamente al usuario.
Hay un montón de grupos predefinidos para elegir. Escojo "Power user access", que da acceso a todo salgo el management de usuarios y grupos.
Esta selección de política genera un fichero de 'policy': PowerUserAccess-vagrantusers-201310092028
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "NotAction": "iam:*",
      "Resource": "*"
    }
  ]
}
Y Amazon me dice que puedo modificar ese fichero para customizar las credenciales del grupo.



### Roles ###
Parece que son permisos que se le pueden dar a las instancias para que realicen ciertas acciones (permitir llamar a AWS, crear interfaces de red, etc)
Aqui también se definen permisos para que usuarios IAM de otras cuentas accedan a esta, o 3rd parties.
Otra opción es permitir usuarios con cuenta en Google, Amazon o Facebook acceder a esta cuenta.


### Signing Certificate ### No se muy bien para que son necesarios.
Use a Signing Certificate (or X.509 Certificate) for secure access to certain AWS product interfaces. For example, EC2 uses a Signing Certificate for access to its SOAP and command line interfaces.
This user does not currently have any signing certificates.
