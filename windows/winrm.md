Remote PowerShell

# Desde linux
https://blogs.technet.microsoft.com/heyscriptingguy/2015/10/27/using-winrm-on-linux/


pip install "pywinrm>=0.2.2"
python
> import winrm
> sess = winrm.Session("127.0.0.1:55985", auth=("vagrant", "vagrant"))
> sess.run_cmd("dir").std_out


# Logging
Podemos ver en Event log las sesiones abiertas.
Si queremos ver en detalle que estamos haciendo deberemos activar el "analytics and debug" logs (View > Show analytics and debug logs)
