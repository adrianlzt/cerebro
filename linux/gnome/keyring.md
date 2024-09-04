El keyring es un almacen de claves y certificados que puede tener distintos backends.

El que suelo usar es el de gnome: gnome-keyring-daemon

Podemos ver los backends disponibles con:
python -m keyring get --list-backends

App X11 para consultar lo almacenado: seahorse

App CLI aur/keyring
Mostrar todos los secretos:

```bash
keyring -k default list
```

No me queda claro como obtener un secreto en particular.

Creo que la interacción se realiza a través de dbus.

De la doc de <https://pypi.org/project/SecretStorage/>
It uses D-Bus Secret Service API that is supported by GNOME Keyring, KWallet (since version 5.97) and KeePassXC.

Para ver los mensajes:
busctl --user monitor org.freedesktop.secrets

En mi pc el almacen de claves predeterminado está en el path:
/org/freedesktop/secrets/collection/Dep_c3_b3sito_5fde_5fclaves_5fpredeterminado
