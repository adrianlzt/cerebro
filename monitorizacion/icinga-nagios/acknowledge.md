ACKNOWLEDGE_SVC_PROBLEM 
If the "sticky" option is set to two (2), the acknowledgement will remain until the service returns to an OK state. Otherwise the acknowledgement will automatically be removed when the service changes state
La opción sticky al hacer el acknowledge es para que persista el Ack aunque el check cambie de estado, pero el check sigue ejecutándose y si devuelve estado OK su estado se actualiza y se elimina el Acknowledge. 

If the "notify" option is set to one (1), a notification will be sent out to contacts indicating that the current service problem has been acknowledged. 

If the "persistent" option is set to one (1), the comment associated with the acknowledgement will survive across restarts of the Nagios process. If not, the comment will be deleted the next time Nagios restarts.

