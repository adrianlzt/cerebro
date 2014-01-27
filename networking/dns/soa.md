$TTL 86400
@ IN SOA gtm.example.com. root.gtm.example.com. (
                                                 2010031200 ; Serial 
                                                 28800 ; Refresh
                                                 14400 ; Retry
                                                 3600000 ; Expire 
                                                 86400 ) ; Minimum


http://www.ietf.org/rfc/rfc1912.txt
In the SOA record of every zone, remember to fill in the e-mail
address that will get to the person who maintains the DNS at your
site (commonly referred to as "hostmaster").  The `@' in the e-mail
must be replaced by a `.' first.  Do not try to put an `@' sign in
this address.  If the local part of the address already contains a
`.' (e.g., John.Smith@widget.xx), then you need to quote the `.' by
preceding it with `\' character.  (e.g., to become
John\.Smith.widget.xx) Alternately (and preferred), you can just use
the generic name `hostmaster', and use a mail alias to redirect it to
the appropriate persons.  There exists software which uses this field
to automatically generate the e-mail address for the zone contact.
This software will break if this field is improperly formatted.  It
is imperative that this address get to one or more real persons,
because it is often used for everything from reporting bad DNS data
to reporting security incidents.
