:: There are 3 providers available for libgl:
:: Repository extra
   1) libglvnd  2) nvidia-304xx-utils  3) nvidia-340xx-utils

Yo tengo instalado el libglvnd
En la iso meto la nvidia-340xx-utils

(58/65) installing xorg-server                                 [##################################] 100%
>>> xorg-server has now the ability to run without root rights with
    the help of systemd-logind. xserver will fail to run if not launched
    from the same virtual terminal as was used to log in.
    Without root rights, log files will be in ~/.local/share/xorg/ directory.

    Old behavior can be restored through Xorg.wrap config file.
    See Xorg.wrap man page (man xorg.wrap).
(59/65) installing nvidia-340xx-utils                          [##################################] 100%
If you run into trouble with CUDA not being available, run nvidia-modprobe first.
Optional dependencies for nvidia-340xx-utils
    gtk2: nvidia-settings
    xorg-server-devel: nvidia-xconfig
    opencl-nvidia-340xx: OpenCL support


pacman -S slim
:: There are 9 providers available for ttf-font:
:: Repository extra
   1) noto-fonts  2) ttf-bitstream-vera  3) ttf-croscore  4) ttf-dejavu  5) ttf-freefont
   6) ttf-linux-libertine
:: Repository community
   7) ttf-droid  8) ttf-liberation  9) ttf-ubuntu-font-family
Eligo la 1
