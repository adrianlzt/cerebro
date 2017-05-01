Iconito para poner en nuestro repo para ver como va los checks, despliege, etc

protected exposes the badge to users having at least Read permission on the job
unprotected exposes the badge to users having at least ViewStatus permission on the job

# GitHub Hooks
Configurar el origen del código fuente -> Git
Disparadores de ejecuciones -> Build when a change is pushed to GitHub

Cuando se recibe un hook del repo configurado, se hace el build.

En el repo debemos configurar el hook como:
Service -> Add Jenkins (GitHub plugin)
Y meter la url del jenkins como: http://ci.jenkins-ci.org/github-webhook/

Entrar de nuevo en la conf del job de jenkins.
Si vemos un mensaje tipo "Hook for repo orga/repo on github.com failed to be registered or were removed. More info can be found on global manage page. This message will be dismissed if Jenkins receives a PING event from repo or repo will be ignored in global configuration."
Hacer una prueba del hook desde la web de github (pulsando en el hook recién configurado, "Test Service")

Parece que ese error puede aparecer aunque esté funcionando correctamente.

Si mandamos un "Test Service" y Jenkins detecta que ya ha hecho build de ese commit, no hará nada.
Lo podemos ver en "Last GitHub Push"
