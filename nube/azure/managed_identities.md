https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview

Managed identities provide an automatically managed identity in Microsoft Entra ID for applications to use when connecting to resources that support Microsoft Entra authentication.
Applications can use managed identities to obtain Microsoft Entra tokens without having to manage any credentials

"Managed Identity" is an account that does not come with a password or an API key and it is designed for use by machines rather than humans.

Dos tipos:
System-assigned
User-assigned

Crear (creo que es una user-assigned):
az identity create --name "${IDENTITY_NAME}"
