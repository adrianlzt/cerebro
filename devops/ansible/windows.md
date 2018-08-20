http://docs.ansible.com/ansible/latest/intro_windows.html
http://docs.ansible.com/ansible/latest/list_of_windows_modules.html

PowerShell 3.0 or higher is needed for most provided Ansible modules for Windows, and is also required to run the above setup script. Note that PowerShell 3.0 is only supported on Windows 7 SP1, Windows Server 2008 SP1, and later releases of Windows.
Consultar version (en una powershell): $PSVersionTable.PSVersion

Para poder usar ansible debe estar activado WinRM (http://docs.ansible.com/ansible/latest/intro_windows.html#windows-system-prep)
En las vagrant parece que ya viene activado.


# Install
En la máquina director:
pip install "pywinrm>=0.2.2"

O en Arch:
sudo pacman -S python2-pywinrm


# Uso
Ejemplo de inventario con un windows levantado con vagrant con WinRM ya configurado:
[windows]
127.0.0.1 ansible_user=vagrant ansible_password=vagrant ansible_port=55985 ansible_connection=winrm ansible_winrm_scheme=http

Comando de prueba:
ansible -i inventory -m win_ping windows



# Services
    - name: Create service for metricbeat
      win_service:
        name: metricbeat
        display_name: metricbeat
        path: "\"{{metricbeat_path}}/metricbeat.exe\" -c \"{{metricbeat_path}}/metricbeat.yml\" -path.home \"{{metricbeat_path}}\" -path.data \"{{metricbeat_data_path}}\" -path.logs \"{{metricbeat_data_path}}/lo
gs\""
        state: started
        description: Collect system metrics



# Internals
Modulos usados: ansible/lib/ansible/modules/windows/

Modulo de donde saca los facts: ansible/lib/ansible/modules/windows/setup.ps1


# Psexec
Si la máquina tiene psexec instalado y corriendo, podemos usar el modulo de ansible https://docs.ansible.com/ansible/2.5/modules/win_psexec_module.html para ejecutar comandos de forma remota.
Windows Server 2008 and higher



# Errores winrm
https://docs.ansible.com/ansible/latest/user_guide/windows_setup.html#http-401-credentials-rejected

Probar desde la propia máquina o desde otra windows (en este último caso cambiando la ip)
winrs -r:http://127.0.0.1:5985 -u:USUARIO -p:CONTRASEÑA hostname
