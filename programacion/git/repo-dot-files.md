Mantener en un repositorio git una copia de mis ficheros de configuración


http://necoro.wordpress.com/2009/10/08/managing-your-configuration-files-with-git-and-stgit/
http://silas.sewell.org/blog/2009/03/08/profile-management-with-git-and-github/
Alias usado: config
Por defecto todos los ficheros ignorados (echo “*” > .gitignore)
Añadir fichero: config add -f <fichero>
Commit: config commit
Subir a inet: config push

Descargar en un nuevo server
alias config='git --git-dir=$HOME/.config.git/ --work-tree=$HOME'
echo "alias config='git --git-dir=$HOME/.config.git/ --work-tree=$HOME'" >> .bashrc
cd ~
git clone git@bitbucket.org:anl/doiles.git config.git
git clone https://aranz@bitbucket.org/aialt/dties.git config.git
mv config.git/.git .config.git
#Para que * coga tambien los dotfiles
shopt -s dotglob  
mv -i config.git/* .
rmdir config.dit
