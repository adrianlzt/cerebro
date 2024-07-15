<https://wiki.archlinux.org/title/Polkit>

Application-level toolkit for defining and handling the policy that allows unprivileged processes to speak to privileged processes

Unit polkit (al menos en arch).

Ejemplo de rule:

```
# cat /etc/polkit-1/rules.d/40-modem-location.rules
polkit.addRule(function(action, subject) {
    if (action === "org.freedesktop.ModemManager1.Location" && subject === "unix-user:hass") {
        return polkit.annotate("{allow}", "Allow modem location access for your user");
    }
});
```

Por lo que veo en los logs, parece que al crear o modificar el fichero se recarga automáticamente.
