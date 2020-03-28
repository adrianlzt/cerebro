https://www.devicetree.org/
https://en.wikipedia.org/wiki/Device_tree
https://events.static.linuxfound.org/sites/events/files/slides/petazzoni-device-tree-dummies.pdf
https://elinux.org/Device_Tree_Reference

A devicetree is a data structure for describing hardware


Estructura de datos con información del hardware.
Se usa sobre todo en sistemas embedidos, por ejemplo Linux/ARM.
Surge del problema de que el kernel tuviese que tener en cuenta las miles de variantes de hardware que podía tener por debajo.
Devicetree permite separar esa información.

A Device Tree represents the hardware configuration as a hierarchy of nodes. Each node may contain properties and subnodes
Podemos verlo como nodos=directorios, properties=ficheros.

Linux/x86 no lo usa, tiene otros sitemas para autodescubrir el hardware.


Ejemplo de la definición (DTS, device tree sources) de la raspberry pi zero:
https://github.com/torvalds/linux/blob/master/arch/arm/boot/dts/bcm2835-rpi-zero.dts

Los DTS se compilan a DTB (device tree blobs), cargados por el bootloader y parseados por el kernel.

Son la unión entre el hardware y los drivers.

Debe describir el layout del hardware y como funciona, pero no debe realizar configuración.
Aunque por ejemplo raspbian parece que lo usa con los "DT parameters"


# Raspberry
https://www.raspberrypi.org/documentation/configuration/device-tree.md

ls /proc/device-tree

Formato human-readable:
dtc -I fs /proc/device-tree


## Carga dinámica
El comando dtoverlay nos permite cargar y quitar overlays dinámicamente (solo podremos quitar los overlays cargados en runtime).
A partir del kernel 4.4.


En el kernel están las definiciones de los DTS y un ejemplo, en formato yaml.
Ejemplo para el hx711
https://github.com/torvalds/linux/blob/master/Documentation/devicetree/bindings/iio/adc/avia-hx711.yaml


Ejemplo de configuración:
#include <dt-bindings/gpio/gpio.h>
weight {
    compatible = "avia,hx711";
    sck-gpios = <&gpio0 27 GPIO_ACTIVE_HIGH>;
    dout-gpios = <&gpio1 17 GPIO_ACTIVE_HIGH>;
    avdd-supply = <&avdd>;
};


La definición de los gpio viene explicada en https://github.com/torvalds/linux/blob/master/Documentation/devicetree/bindings/gpio/gpio.txt


Tendremos que compilar el dts en dtbo con el compilador "dtc".
Metemos el .dtbo en /boot/overlays/
Y luego usamos "dtoverlay" para cargarlo.
dtoverlay -v fichero.dtbo

Si el fichero tiene la sintaxis correcta, se cargará en el devicetree, lo veremos por ejemplo en:
/proc/device-tree/hx711

Pero eso no quiere decir que esté funcionando.
Si no lo vemos en /sys/bus/iio/devices/ es que algo no funciona (al menos eso he visto con el hx711).


## Overlay para HX711


/dts-v1/;
/plugin/;

#include <dt-bindings/gpio/gpio.h>

/ {
  compatible = "brcm,bcm2835";

  fragment@0 {
    target-path = "/";
    __overlay__ {

      // El segundo "hx711" es el nombre que veremos en /proc/device-tree/XXX/
      hx711: hx711 {
        compatible = "avia,hx711";
        sck-gpios = <&gpio 27 GPIO_ACTIVE_HIGH>;
        dout-gpios = <&gpio 17 GPIO_ACTIVE_HIGH>;
        avdd-supply = <&vdd_3v3_reg>;
        status = "okay";
      };
    };
  };
};


## Debug /troubleshooting
Para leer un .dtbo
dtc -I dtb -O dts fichero.dtbo
O más modo debug:
ftdump file.dtbo


Obtener un dump del DT actual que está siendo usado. Esto me ha sido muy útil para poder encontrar el elemento al que tenía que hacer referencia:
dtc -I fs /proc/device-tree

Aqui podemos ver todos los elementos que tenemos en nuestro sistema, aunque los nombres que aparecen ahí no son los que tenemos que usar para hacerlos referencia.
Por ejemplo, podemos ver la entrada:
        fixedregulator_3v3 {
                compatible = "regulator-fixed";

Pero en realidad para referirnos a él tenemos que llamarlo como:
<&vdd_3v3_reg>

Que es como se define en el dts: https://github.com/raspberrypi/linux/blob/642e12d892e694214e387208ebd9feb4a654d287/arch/arm/boot/dts/bcm2835-rpi.dtsi#L38
