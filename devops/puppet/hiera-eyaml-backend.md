https://github.com/TomPoulton/hiera-eyaml

gem install hiera-eyaml

mkdir /tmp/puppet-eyaml
cd /tmp/puppet-eyaml
eyaml createkeys
chmod 400 keys/*

vi /etc/hiera.yaml (o /etc/puppet/hiera.yaml)
---
:backends:
  - eyaml
  - json
:hierarchy:
  - defaults
:eyaml:
  :datadir: '/tmp/puppet-eyaml'
  :pkcs7_private_key: /tmp/puppet-eyaml/keys/private_key.pkcs7.pem
  :pkcs7_public_key:  /tmp/puppet-eyaml/keys/public_key.pkcs7.pem

eyaml encrypt -s 'hello there'
Cogemos la salida de "string :..." y la metemos en el eyaml

vi /tmp/puppet-eyaml/defaults.eyaml
---
cosa: ENC[PKCS7,MIIBiQYJKoZI...]
