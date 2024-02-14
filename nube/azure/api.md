Obtener token, id subscription y tenant:
az account get-access-token -o json

token=$(az account get-access-token -o json | jq .accessToken -r)


Si queremos usar az para hacer llamadas:
az rest -m get --header "Accept=application/json" -u ‘https://management.azure.com/subscriptions/{subscriptionId}/providers/Microsoft.Web/sites?api-version=2016-08-01'

az rest -m post --header "Content-Type=application/json" -u https://graph.microsoft.com/v1.0/applications --body '{"groupMembershipClaims":null,"api":{"requestedAccessTokenVersion":2},"description":null,"displayName":"adri-prueba-curl-api","info":{"marketingUrl":null,"privacyStatementUrl":null,"supportUrl":null,"termsOfServiceUrl":null},"notes":null,"serviceManagementReference":null,"signInAudience":"AzureADMyOrg","web":{"homePageUrl":null,"implicitGrantSettings":{"enableAccessTokenIssuance":false,"enableIdTokenIssuance":false},"logoutUrl":null}}'
