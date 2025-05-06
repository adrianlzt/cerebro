Podemos exportar una plantilla para generar recursos que tengamos creados.

Ir a la vista de resource group, seleccionar los recursos que queremos exportar y darle al botón de "Export".

Ejecutar usando "az":

```bash
az deployment group create --resource-group image-builder --template-file template.json --parameters parameters.json
```
