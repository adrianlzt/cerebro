Valores recomendados por RIPE https://www.ripe.net/publications/docs/ripe-203

example.com.  3600  SOA  dns.example.com. hostmaster.example.com. (
                         1999022301   ; serial YYYYMMDDnn
                         86400        ; refresh (  24 hours)
                         7200         ; retry   (   2 hours)
                         3600000      ; expire  (1000 hours)
                         172800 )     ; minimum (   2 days)


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
