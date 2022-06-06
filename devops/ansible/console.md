https://docs.ansible.com/ansible/latest/cli/ansible-console.html

Ejecución de módulos con autocompletar.

ansible-console
$ copy dest=/tmp/foo content=hola


Ejemplo configurando un repo:
````
$ become yes
# yum_repository name=hashicorp description="Hashicorp Stable - $basearch" file=hashicorp baseurl="https://rpm.releases.hashicorp.com/RHEL/$releasever/$basearch/stable" gpgcheck=yes gpgkey=["https://rpm.releases.hashicorp.com/gpg"]
````
