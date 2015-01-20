Se puede definir el timeout de los token que circulan para mantener el anillo:

http://linux.die.net/man/5/corosync.conf

token
This timeout specifies in milliseconds until a token loss is declared after not receiving a token. This is the time spent detecting a failure of a processor in the current configuration. Reforming a new configuration takes about 50 milliseconds in addition to this timeout.
The default is 1000 milliseconds.


token_retransmit
This timeout specifies in milliseconds after how long before receiving a token the token is retransmitted. This will be automatically calculated if token is modified. It is not recommended to alter this value without guidance from the corosync community.
The default is 238 milliseconds.

token_retransmits_before_loss_const

