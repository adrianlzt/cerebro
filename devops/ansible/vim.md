https://github.com/pearofducks/ansible-vim

Plug 'pearofducks/ansible-vim', { 'do': './UltiSnips/generate.sh' }

Como decide si es ansible:
/home/adrian/.config/nvim/bundle/ansible-vim/ftdetect/ansible.vim

# Config
Snippets autogenerados:
Para usar con vim-vsnip: https://github.com/bammab/vscode-snippets-for-ansible

Para UltiSnips:
bundle/ansible-vim/UltiSnips/ansible.snippets
Por defecto usan el sistema antiguo "key=valor".
Para usar el nuevo modificar /home/adrian/.config/nvim/bundle/ansible-vim/UltiSnips/generate.sh
-exec "$PYTHON_VERSION" generate.py $@
+exec "$PYTHON_VERSION" generate.py --style dictionary $@

Y volver a ejectuar generate.sh


Tendremos snippets para todos los módulos de ansible

# Uso
Para crear un playbook dummy:
vi test.yaml
empezamos a escribir "ansible" y completamos el snippet.

Para que ahora detecte que es ansile:
:w
:e

A partir de ese momento tendremos disponibles todos los snippets de ansible.
Para que salte:
- name: blabla
  <aqui saltará>


Mirar identline para mostrar lineas verticales de identacion
