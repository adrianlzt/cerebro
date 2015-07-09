https://d0.awsstatic.com/whitepapers/aws-security-whitepaper.pdf

# IP Spoofing
No se permite que una máquina envie paquetes con una IP que no corresponda a su MAC.
Esto da problemas con varias cosas, como con tuneles GRE. El paquete de vuelta de GRE, al ser desencapsulado tiene la IP de la máquina origen pero la MAC de la máquina que está desencapsulando.
