export testNODE=puppet.service.dsn.inet; export testPORT=8140; (cat < /dev/tcp/$testNODE/$testPORT) & sleep 1;  ss -n | grep $testPORT ; kill %

Si se puede conectar la primera columa pondrá "ESTAB"
Si no puede conectar pondrá "SYN-SENT"
