http://docs.ansible.com/developing_api.html

Usar ansible desde python.
No merece mucho la pena porque nos quedamos sin la funcionalidad que nos dan los ejecutables ansible y ansible-playbook

Ejemplo, lanzar el módulo ping contra los hosts del inventario que cumplan "web*"
import ansible.runner

runner = ansible.runner.Runner(
   module_name='ping',
   module_args='',
   pattern='web*',
   forks=10
)
datastructure = runner.run()
  esta instrucción se quedará en ejecucción hasta que todo haya terminado


Ejecutar uptime en localhost
results = ansible.runner.Runner(pattern='localhost', forks=10, module_name='command', module_args='/usr/bin/uptime').run()


# Python 3
Some Linux operating systems, such as Arch, may only have Python 3 installed by default. This is not sufficient and you will get syntax errors trying to run modules with Python 3. Python 3 is essentially not the same language as Python 2. Ansible modules currently need to support older Pythons for users that still have Enterprise Linux 5 deployed, so they are not yet ported to run under Python 3.0. This is not a problem though as you can just install Python 2 also on a managed host.
Setting of an inventory variable ‘ansible_python_interpreter’ on any host will allow Ansible to auto-replace the interpreter used when executing python modules. Thus, you can point to any python you want on the system if /usr/bin/python on your system does not point to a Python 2.X interpreter.


