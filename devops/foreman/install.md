https://theforeman.org/manuals/1.19/index.html#3.InstallingForeman

Hardware mínimo
4GB memory
2GB disk space


sudo yum -y install https://yum.puppetlabs.com/puppet5/puppet5-release-el-7.noarch.rpm http://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm https://yum.theforeman.org/releases/1.19/el7/x86_64/foreman-release.rpm
sudo yum -y install foreman-installer
sudo foreman-installer

/opt/puppetlabs/bin/puppet module install puppetlabs/ntp
