## Templates ##
Optionally, units may be instantiated from a template file at runtime. This allows creation of multiple units from a single configuration file. If systemd looks for a unit configuration file, it will first search for the literal unit name in the file system. If that yields no success and the unit name contains an "@" character, systemd will look for a unit template that shares the same name but with the instance string (i.e. the part between the "@" character and the suffix) removed. Example: if a service getty@tty3.service is requested and no file by that name is found, systemd will look for getty@.service and instantiate a service from that configuration file if it is found.

Lo que vaya despues de la arroba será el parámetro %i

Ejemplo del service de dropbox

[Unit]
Description=Dropbox
After=local-fs.target network.target

[Service]
Type=simple
ExecStart=/usr/bin/dropbox
ExecReload=/bin/kill -HUP $MAINPID
KillMode=process
Restart=on-failure
User=%i

[Install]
WantedBy=multi-user.target

