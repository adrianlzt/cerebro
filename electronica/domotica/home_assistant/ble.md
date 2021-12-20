# BLE Monitor
https://custom-components.github.io/ble_monitor/Installation

En HACS:
Passive BLE monitor integration

Tras añadir el device desde la UI, si vamos a http://192.168.137.111:8123/config/integrations, en a tarjeta podremos ver:
1 device and 4 entities

Si vamos a devices veremos que se ha creado uno nuevo:
http://192.168.137.111:8123/config/devices/dashboard

Dict donde se define que sensores tiene cada dispositivo
https://github.com/custom-components/ble_monitor/blob/113671d43be57405375a92ffcd35bba777852a98/custom_components/ble_monitor/const.py#L590


## Añadir dispositivos no soportados / report unknown
https://custom-components.github.io/ble_monitor/configuration_params#report_unknown
https://custom-components.github.io/ble_monitor/faq#my-sensor-is-not-in-the-list-of-supported-ones-how-to-request-implementation

Activar el logging info para esta app
logger:
  default: warning
  logs:
    custom_components.ble_monitor: info

Activar el "report unknown" a "Other" (o una marca determinada si está en la lista)


## Simular device
Ejemplo de un device Xiaomi, con explicación de los datos para que funcione el ble_parser.parse_data()
https://gist.github.com/adrianlzt/49f8f5c563e97e516b6f4c8d8368d39e
