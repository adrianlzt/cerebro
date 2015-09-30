Events entered into the index have a :ttl field which indicate how long that event is valid for. Events that sit in the index for longer than their TTL are removed from the index and reinserted into the event streams with state "expired". Instead of polling for failure, just let events expire. Services which fail to check in regularly can be handled by the same state-transition streams you use for error handling.

Loguear eventos expirados
(expired #(warn "expired" %))
