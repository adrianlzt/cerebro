Para enviar un email usando SMTP.

<https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/email/send-email-smtp/smtp-authentication>

Hace falta crear una App en Azure Entra y crearle una credential.
Hace falta crear un rol con permisos para poder enviar el email.
Asignar ese rol a la App.

<https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/email/send-email-smtp/send-email-smtp?pivots=smtp-method-powershell>

Luego crear un Email Communication Service y asignarle un dominio.
Luego crear un Communication Service y asociarlo al Email Communication Service.

Para generar el usuario se hace con los datos de la App entra y el nombre del Communication Services:
username: <Azure Communication Services Resource name>.<Entra Application ID>.<Entra Tenant ID>
password: el value de la credential creada en la App entra.

En el mail from tendremos que usar una de las direcciones que aparecen "Email Communication Services Domain", Email services - MailFrom addresses.

Ejemplo de envío de email con curl:

```
curl --url "smtp://smtp.azurecomm.net:587" \
     -v --ssl-reqd \
     --mail-from "DoNotReply@xxxxxxxx-xxxx-44da-9a4b-9a7ffd5a9e74.azurecomm.net" \
     --mail-rcpt "john@mail.com" \
     --upload-file <(echo -e "Subject: Test mail\n\n test") \
     --user "NOMBRE_DEL_COMMUNICATION_SERVICE.ID_APP_ENTRA.TENANT_APP_ENTRA:VALUE_SECRET_APP_ENTRA"
```

También se pueden enviar emails usando SMTP.
Mirar en Communication Service - Email - Try email
