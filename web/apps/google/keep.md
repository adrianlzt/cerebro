Solo tiene API oficial para las cuentas de workspace (de pago).

API no oficial, en python: https://github.com/kiwiz/gkeepapi

Para autenticarnos necesitamos el master token.

Primero generar una app password.

Luego usar:
```bash
docker run --rm -it breph/ha-google-home_get-token
```
