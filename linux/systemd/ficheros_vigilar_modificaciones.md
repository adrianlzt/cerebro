https://www.freedesktop.org/software/systemd/man/systemd.path.html

Vigilamos un fichero y ejecutamos el service asociado si se produce algún cambio


local-apt-repository.path

[Path]
PathChanged=/srv/local-apt-repository

[Install]
WantedBy=paths.target




local-apt-repository.service 

[Unit]
Description=Local apt repository recreation

[Service]
Type=oneshot
ExecStart=/usr/lib/local-apt-repository/rebuild

