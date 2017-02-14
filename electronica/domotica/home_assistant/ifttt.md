https://home-assistant.io/components/ifttt/
Coger la api key de https://ifttt.com/services/maker/settings
Meter en la conf como:
ifttt:
  key: xxx


Enviar evento a ifttt.
Usaremos Maker de ifttt con un post hacia:
MIURL/api/services/xxx/turn_on?api_password=XXX


Mirar https://home-assistant.io/developers/rest_api/ para ver como llamar a la api


Ejemplo
POST /api/services/<domain>/<service>
{
    "entity_id": "light.Ceiling"
}
