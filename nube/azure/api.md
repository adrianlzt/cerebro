Obtener token, id subscription y tenant:
az account get-access-token -o json

token=$(az account get-access-token -o json | jq .accessToken -r)


Si queremos usar az para hacer llamadas:
az rest -m get --header "Accept=application/json" -u ‘https://management.azure.com/subscriptions/{subscriptionId}/providers/Microsoft.Web/sites?api-version=2016-08-01'

az rest -m post --header "Content-Type=application/json" -u https://graph.microsoft.com/v1.0/applications --body '{"groupMembershipClaims":null,"api":{"requestedAccessTokenVersion":2},"description":null,"displayName":"adri-prueba-curl-api","info":{"marketingUrl":null,"privacyStatementUrl":null,"supportUrl":null,"termsOfServiceUrl":null},"notes":null,"serviceManagementReference":null,"signInAudience":"AzureADMyOrg","web":{"homePageUrl":null,"implicitGrantSettings":{"enableAccessTokenIssuance":false,"enableIdTokenIssuance":false},"logoutUrl":null}}'

# curl https://mauridb.medium.com/calling-azure-rest-api-via-curl-eb10a06127

Obtener token:
curl -X POST -H 'Content-Type: application/x-www-form-urlencoded' \
    https://login.microsoftonline.com/xxxxxbd0-046c-xxxx-87b6-xxxxxxxxxf68/oauth2/token \
    -d 'client_id=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' \
    -d 'grant_type=client_credentials' \
    -d 'resource=https://management.azure.com/' \
    -d 'client_secret=Rxxxx~Y5gGxxxxAb~Sc1oV1f6Exxxxh2kJxxxxgV'

Llamar a la API
curl -XPUT https://management.azure.com/subscriptions/${subscription_id}/resourceGroups/${resource_group_name}/providers/Microsoft.AzureActiveDirectory/b2cDirectories/${aad_b2c_name}.onmicrosoft.com?api-version=2023-01-18-preview \
    -H "Authorization: Bearer ${access_token}" -H "Content-Type: application/json" \
    -d '{ "location": "United States", "sku": { "name": "Standard", "tier": "A0" }, "properties": { "createTenantProperties": { "displayName": "PruebaAdriB2CDir", "countryCode": "US", "isGoLocalTenant": true } } }'