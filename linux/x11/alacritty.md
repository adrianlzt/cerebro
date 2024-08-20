https://github.com/alacritty/alacritty

Terminal simple.
Sustituto de termite

# Conf
https://alacritty.org/config-alacritty.html

Fichero en formato TOML

El fichero de conf se pone como asset en cada una de las releases
https://github.com/alacritty/alacritty/releases

Para ayudarnos a realizar la config podemos usar https://pypi.org/project/pycritty/

.config/alacritty/alacritty.yml

## Color schemes
https://github.com/alacritty/alacritty/wiki/Color-schemes

## Font
Configurar las disponibles en:
.config/alacritty/alacritty.toml

Ejemplo usando jetbrais nerd font
```tomls
[font]
size = 10.0
[font.normal]
family = "JetBrainsMono Nerd Font"
style = "Regular"
[font.bold]
family = "JetBrainsMono Nerd Font"
style = "Bold"
[font.italic]
family = "JetBrainsMono Nerd Font"
style = "Italic"
[font.bold_italic]
family = "JetBrainsMono Nerd Font"
style = "Bold Italic"
```

Hace falta tener instalado
ttf-jetbrains-mono-nerd
