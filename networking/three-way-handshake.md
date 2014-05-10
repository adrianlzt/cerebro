http://tools.ietf.org/html/rfc793
http://tools.ietf.org/html/rfc1323

Diagrama de estado de conexiones: http://d1g3mdmxf8zbo9.cloudfront.net/images/tcp/tcp-state-diagram.png


      TCP A                                                TCP B

  1.  CLOSED                                               LISTEN

  2.  SYN-SENT    --> <SEQ=0><CTL=SYN>                  --> SYN-RECEIVED

  3.  ESTABLISHED <-- <SEQ=0><ACK=1><CTL=SYN,ACK>       <-- SYN-RECEIVED

  4.  ESTABLISHED --> <SEQ=1><ACK=1><CTL=ACK>           --> ESTABLISHED

  5.  ESTABLISHED --> <SEQ=1><ACK=1><CTL=PSH,ACK><DATA> --> ESTABLISHED

          Basic 3-Way Handshake for Connection Synchronization


Closing connection
http://tools.ietf.org/html/rfc793#page-37

      TCP A                                                TCP B

  1.  ESTABLISHED                                          ESTABLISHED

  2.  (Close)
      FIN-WAIT-1  --> <SEQ=100><ACK=300><CTL=FIN,ACK>  --> CLOSE-WAIT

  3.  FIN-WAIT-2  <-- <SEQ=300><ACK=101><CTL=ACK>      <-- CLOSE-WAIT

  4.                                                       (Close)
      TIME-WAIT   <-- <SEQ=300><ACK=101><CTL=FIN,ACK>  <-- LAST-ACK

  5.  TIME-WAIT   --> <SEQ=101><ACK=301><CTL=ACK>      --> CLOSED

  6.  (2 MSL)
      CLOSED

                         Normal Close Sequence


Case 1:  Local user initiates the close

    In this case, a FIN segment can be constructed and placed on the
    outgoing segment queue.  No further SENDs from the user will be
    accepted by the TCP, and it enters the FIN-WAIT-1 state.  RECEIVEs
    are allowed in this state.  All segments preceding and including FIN
    will be retransmitted until acknowledged.  When the other TCP has
    both acknowledged the FIN and sent a FIN of its own, the first TCP
    can ACK this FIN.  Note that a TCP receiving a FIN will ACK but not
    send its own FIN until its user has CLOSED the connection also.

  Case 2:  TCP receives a FIN from the network

    If an unsolicited FIN arrives from the network, the receiving TCP
    can ACK it and tell the user that the connection is closing.  The
    user will respond with a CLOSE, upon which the TCP can send a FIN to
    the other TCP after sending any remaining data.  The TCP then waits
    until its own FIN is acknowledged whereupon it deletes the
    connection.  If an ACK is not forthcoming, after the user timeout
    the connection is aborted and the user is told.

En la descripción de la RFC no queda claro que hacer con TIME_WAIT.
Según se entiende en la figura, el que inicia el fin de la conexión es quien debe quedarse en TIME_WAIT durante 2xMSL

