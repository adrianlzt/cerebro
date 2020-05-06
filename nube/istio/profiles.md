https://istio.io/docs/setup/additional-setup/config-profiles/

Profiles disponibles por defecto: default, demo, minimal, remote, empty, separate

Podemos ver que va a desplegar cada uno con:
istioctl profile dump NOMBRE

default: el que usaremos para producción
demo: despliega todo, con el tracing/logging al máximo para mostrar las funcionalidades
minimal: lo mínimo para usar traffic management

Para configurar el profile usaremos, al llamar a "iostioctl manifest":
--set key=value


Mirar arquitectura para mirar los componentes que forman istio.
