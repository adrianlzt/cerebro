$ gpg --gen-key      Generate public/private keys
pub   2048R/99A9CF07 2011-09-16
$ gpg -a -o RPM-GPG-KEY-ABC –-export 99A9CF07     Export public key 
$ vi ~/.rpmmacros                Add _gpg_name keyID to your .rpmmacros file
%_gpg_name 99A9CF07
$ rpm –-resign  ~/rpmbuild/RPMS/x86_64/tree-1.5.3-2.el6.x86_64.rpm   Sign pkg
