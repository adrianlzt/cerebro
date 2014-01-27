https://github.com/ClusterLabs/hawk

Interfaz web para administrar pacemaker.

Solo existen paquetes para suse.

git clone https://github.com/ClusterLabs/hawk
yum install rpm-build
yum install pacemaker-libs-devel rubygem-fast_gettext rubygem-gettext rubygem-gettext_i18n_rails rubygem-rails rubygem-rake glib2-devel libxml2-devel pam-devel
make rpm
