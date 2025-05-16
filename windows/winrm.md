Remote PowerShell

# How to configure WinRM

To configure WinRM we need to run the following command:

```powershell
winrm quickconfig
```

Para activar WinRM con https:

<https://learn.microsoft.com/en-us/troubleshoot/windows-client/system-management-components/configure-winrm-for-https>
WinRM HTTPS requires a local computer Server Authentication certificate with a CN matching the hostname to be installed. The certificate mustn't be expired, revoked, or self-signed.

Para usar un cert auto-firmado: <https://www.withsecure.com/userguides/product.html?business/radar/4.0/en/task_8772A6A76D994406B4809EB264EB51EE-4.0-en>

# Desde linux

<https://blogs.technet.microsoft.com/heyscriptingguy/2015/10/27/using-winrm-on-linux/>

pip install "pywinrm>=0.2.2"
python

> import winrm
> sess = winrm.Session("127.0.0.1:55985", auth=("vagrant", "vagrant"))
> sess.run_cmd("dir").std_out

# Logging

<https://blogs.msdn.microsoft.com/wmi/2010/03/16/collecting-winrm-traces/>

Podemos ver en Event log las sesiones abiertas.
Si queremos ver en detalle que estamos haciendo deberemos activar el "analytics and debug" logs (View > Show analytics and debug logs)

Application and Services Logs > Microsoft > Windows > Windows Remote Management
