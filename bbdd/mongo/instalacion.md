vi /etc/yum.repos.d/mongodb.repo

[mongodb]
name=MongoDB Repository
baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/x86_64/
gpgcheck=0
enabled=1

yum install -y mongodb-org
