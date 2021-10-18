# Tesseract
## Install
pacman -S tesseract tesseract-data-eng tesseract-data-spa

## Uso
Así saca por stdout el texto reconocido:
tesseract -l spa img-2021-10-12-131207.png -

Pasarle directamente una captura de pantalla:
import -window Calculadora png:- | tesseract -l spa - -
