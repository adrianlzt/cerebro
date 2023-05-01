https://unix.stackexchange.com/questions/317695/is-it-possible-to-have-apt-accept-an-invalid-certificate

/etc/apt/apt.conf.d/02-skip-tls-foo-bar-com
Acquire::https::foo.bar.com::Verify-Peer "false";


O si queremos desactivarlo completamente
// Do not verify peer certificate
Acquire::https::Verify-Peer "false";
// Do not verify that certificate name matches server name
Acquire::https::Verify-Host "false";
