Leer todos los params de la webcam
v4l2-ctl --all

Formato de captura:
v4l2-ctl -V

Cambiar formato de captura:
v4l2-ctl -v width=160,height=120

Modificar parametros
v4l2-ctl --set-fmt-video=width=1920,height=1080,pixelformat=1
v4l2-ctl --set-parm=30
