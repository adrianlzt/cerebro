https://stribika.github.io/2015/01/04/secure-secure-shell.html
http://www.la-samhna.de/library/brutessh.html

/etc/ssh/sshd_config
KexAlgorithms curve25519-sha256@libssh.org,diffie-hellman-group-exchange-sha256
Protocol 2
HostKey /etc/ssh/ssh_host_ed25519_key
HostKey /etc/ssh/ssh_host_rsa_key
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com,aes128-gcm@openssh.com,aes256-ctr,aes192-ctr,aes128-ctr
MACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com,hmac-ripemd160-etm@openssh.com,umac-128-etm@openssh.com



/etc/ssh/ssh_config
Host *
KexAlgorithms curve25519-sha256@libssh.org,diffie-hellman-group-exchange-sha256
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com,aes128-gcm@openssh.com,aes256-ctr,aes192-ctr,aes128-ctr
MACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com,hmac-ripemd160-etm@openssh.com,umac-128-etm@openssh.com

# Github supports neither AE nor Encrypt-then-MAC.
Host github.com
MACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com,hmac-ripemd160-etm@openssh.com,umac-128-etm@openssh.com,hmac-sha2-512



If you chose to enable diffie-hellman-group-exchange-sha256, open /etc/ssh/moduli if exists, and delete lines where the 5th column is less than 2000. If it does not exist, create it:

ssh-keygen -G /tmp/moduli -b 4096
ssh-keygen -T /etc/ssh/moduli -f /tmp/moduli
