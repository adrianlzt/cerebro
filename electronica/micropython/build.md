https://github.com/micropython/micropython/wiki/Getting-Started

Crear un container con ubuntu

apt-get install build-essential libreadline-dev libffi-dev git pkg-config gcc-arm-none-eabi libnewlib-arm-none-eabi libusb-1.0-0-dev cmake python3-pip python3-venv

clonar el repo de micropython

clonar repo de esp-idf y xtensa-esp32
https://github.com/wieck/micropython-esp32-devel#:~:text=populate%20that%20directory.-,What%20it%20does%20is,-mkdir%20%24HOME/esp32

instalar esp-idf (fuera de un virtualenv):
cd esp-idf
bash install.sh
. ./export.sh

cd micropython/
git checkout v1.20

cd ports/unix/
make
Y ya tenemos compilado el micropython

cd ports/esp32/
make -j4

Hay que ver que versión de esp-idf necesita el port de esp32.
Para micropython 1.20 parece que era esp-idf 4, para la rama master (813d559) usa esp-idf 5.


Para meter la cámara
https://github.com/lemariva/micropython-camera-driver#diy

he tenido que copiar el src/ del repo en ports/esp32/main_esp32/
cd ports/esp32/
make USER_C_MODULES=./camdriver/micropython.cmake BOARD=ESP32_CAM all


probando con los commits que dice el repo
Con eso consigo el build, pero el init de la cámara por defecto falla.
>>> camera.init(0)
E (40170) gpio: gpio_install_isr_service(449): GPIO isr service already installed
E (40200) camera: Camera probe failed with error 0x105(ESP_ERR_NOT_FOUND)

Tengo que ver que parámetros hay que pasar.
Debería poder verlo como lo usa esphome.


Intentando poner los pines "data" que veo en esphome
https://github.com/Xinyuan-LilyGO/LilyGo-Camera-Series/blob/8103df564a2218e5491eafccbd6b5b0898506569/esphome/t-camera-v162.yaml#L31
  data_pins: [GPIO34, GPIO13, GPIO14, GPIO35, GPIO39, GPIO38, GPIO37, GPIO36]

>>> camera.init(0, d0=34, d1=13, d2=14, d3=35, d4=39, d5=38, d6=37, d7=36)
E (393940) gpio: gpio_install_isr_service(449): GPIO isr service already installed
E (393970) camera: Camera probe failed with error 0x105(ESP_ERR_NOT_FOUND)

 sioc=18, # sccb_scl
 siod=23, # sccb_sda

camera.init(0, xclk=4, xclk_freq=camera.XCLK_20MHz, sioc=18, siod=23, d0=34, d1=13, d2=14, d3=35, d4=39, d5=38, d6=37, d7=36, vsync=5, href=27, pclk=25, reset=-1, pwdn=-1)


Intentando copiar lo mismo de esphome
>>> camera.init(0, xclk=4, xclk_freq=camera.XCLK_20MHz, sioc=18, siod=23, d0=34, d1=13, d2=14, d3=35, d4=39, d5=38, d6=37, d7=36, vsync=5, href=27, pclk=25, reset=-1, pwdn=-1)
E (789680) gpio: gpio_install_isr_service(449): GPIO isr service already installed
E (789690) camera: Camera probe failed with error 0x105(ESP_ERR_NOT_FOUND)

>>> camera.init(0, xclk=4, xclk_freq=camera.XCLK_20MHz, sioc=18, siod=23, d0=34, d1=13, d2=14, d3=35, d4=39, d5=38, d6=37, d7=36, vsync=5, href=27, pclk=25, reset=-1, pwdn=-1, format=camera.JPEG, framesize=camera.FRAME_VGA, fb_location=camera.PSRAM)
E (933270) gpio: gpio_install_isr_service(449): GPIO isr service already installed
E (933280) camera: Camera probe failed with error 0x105(ESP_ERR_NOT_FOUND)


El error es porque esta función devuelve 0
https://github.com/espressif/esp32-camera/blob/master/driver/sccb.c#L95
