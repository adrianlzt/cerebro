Tras borrar un paquete puede que se haya quedado generado el enlace para que una app arranque al inicio. Tendremos que deshabilitarla a mano, aunque el programa ya no exista.
Ejemplo, tras instalar gdm y hacer un enable. Si borramos gdm, seguirá habiendo un enlace para arrancar gdm, deberemos ejecutar "systemctl disable gdm", si no el resto de gestores de sessión no se podrán poner como enable.
