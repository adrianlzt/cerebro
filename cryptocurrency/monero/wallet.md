https://monero.stackexchange.com/questions/3273/how-can-i-use-monero-without-syncing-the-blockchain

Para crear una wallet lo ideal es montar un nodo de monero (tendremos que sincronizar y puede tardar varias horas) y luego usar la cli del wallet contra ese nodo.

Otra opción es usar MyMonero, web hecha por un miembro del core team.

Otra más es usar un nodo remoto:
monero-wallet-cli --daemon-address node.moneroworld.com:18089 --generate-new-wallet monero.wallet
