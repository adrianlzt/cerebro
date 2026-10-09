https://github.com/WiVRn/WiVRn
https://docs.blender.org/manual/en/latest/addons/3d_view/vr_scene_inspection.html

Ver un modelo de Blender dentro de las Oculus Quest 2 desde Linux (Arch).
Blender usa OpenXR (addon "VR Scene Inspection", solo para ver/navegar, no editar).
Las Quest 2 no tienen runtime OpenXR para Linux, así que usamos WiVRn (streaming OpenXR basado en Monado), por cable USB o wifi.


# Requisitos
Modo desarrollador activado en el visor (app Meta del móvil) y depuración USB aceptada en las gafas.
Firmware actualizado. Con el v49 (feb 2023) la app WiVRn se cerraba al segundo con
  XR_ERROR_RUNTIME_UNAVAILABLE ... failed to determine active runtime file path
(el loader OpenXR del Quest no encontraba org.khronos.openxr.system_runtime_broker).
Actualizar en Configuración > Sistema > Actualización de software (quedó en v64).


# Instalar en el PC
WiVRn server + dashboard desde AUR. Necesita multilib habilitado en /etc/pacman.conf, porque el paquete compila también la versión de 32 bits (lib32-gcc-libs, lib32-glibc, lib32-libglvnd, lib32-vulkan-icd-loader)

    sudo sed -i '/^#\[multilib\]/{s/^#//;n;s/^#//}' /etc/pacman.conf
    sudo pacman -Syu --needed lib32-gcc-libs lib32-glibc lib32-libglvnd lib32-vulkan-icd-loader
    paru -S wivrn-server wivrn-dashboard

Si paru falla con "Missing dependencies: lib32-*", instalar los lib32 a mano antes (paru no los resuelve).

Avahi tiene que estar arrancado, si no el server no arranca ("Avahi daemon is not started"):

    sudo systemctl enable --now avahi-daemon

El aviso "No OpenVR compatibility" se puede ignorar (solo afecta a juegos de Steam).


# Instalar el cliente en las gafas
APK de la misma versión que el server (releases de GitHub)

    curl -LO https://github.com/WiVRn/WiVRn/releases/download/v26.9/WiVRn-release.apk
    adb install -r WiVRn-release.apk

La app aparece en Aplicaciones > Orígenes desconocidos.
También se puede instalar desde wivrn-dashboard.
Si adb dice "unauthorized", aceptar el diálogo de depuración USB dentro de las gafas.


# Conectar por cable
1. wivrn-dashboard > Running (arranca wivrn-server y lo deja como runtime OpenXR activo: ~/.config/openxr/1/active_runtime.json)
2. Pulsar "Connect (wired)" en el dashboard. Lanza la app en el Quest ya apuntando al server (hace el adb reverse).
3. La primera vez, activar "Pairing" y aceptar en las gafas (queda en ~/.config/wivrn/known_keys.json)

Equivalente a mano:

    adb reverse tcp:9757 tcp:9757
    # en la app: añadir servidor localhost:9757

Si abrimos la app desde el menú del Quest sin pasar por el dashboard solo pide "añadir servidor", no descubre nada por USB.

Por wifi hay que abrir el puerto en firewalld (por USB no hace falta, va por loopback):

    sudo firewall-cmd --add-port=9757/tcp --add-port=9757/udp --add-service=mdns


# Blender
Edit > Preferences > Add-ons > activar "VR Scene Inspection" (viene incluido, viewport_vr_preview)
Panel: View > Sidebar (o N con el ratón sobre el viewport 3D) > pestaña VR > Start VR Session
También F3 > "Toggle VR Session"

Con el visor ya conectado a WiVRn antes de pulsar Start VR Session.
Para debug, arrancar Blender desde terminal

    XR_LOADER_DEBUG=all blender --debug-xr 2>&1 | tee blender-xr.log

Comprobar que Blender tiene soporte OpenXR

    blender --background --python-expr "import bpy; print(bpy.app.build_options.xr_openxr)"


# Errores
## Failed to create VR session ... XR_ERROR_GRAPHICS_DEVICE_INVALID
En el log: "xrCreateSession ... does not contain any known graphics bindings".
Blender por defecto usa el backend OpenGL y WiVRn solo acepta Vulkan.
Probar forzando Vulkan (pendiente de confirmar que funciona para VR en Blender 5.2)

    blender --gpu-backend vulkan

Si no funcionara, alternativa: ALVR + SteamVR (soporta OpenGL).

## headset incompatible with session: headset features changed
El wivrn-server tenía una sesión de antes de cambiar algo en el visor (en mi caso actualizar el firmware).
Matar los wivrn-server viejos (llegué a tener dos) y volver a arrancar desde el dashboard

    pkill -x wivrn-server

## dmesg: Operation not permitted
dmesg necesita root. Para ver si el USB se ve: lsusb | grep -i quest (ID 2833:0186) y adb devices.
