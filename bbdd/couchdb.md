https://news.ycombinator.com/item?id=10994736

I get it: CouchDB was a very early (the first real?) document-based database, and it got some things wrong, or at least weird early on (e.g. map/reduce queries, a reduce step to the map/reduce query that is actually one-to-many (on purpose! there are concrete reasons in real life you want this!), etc.).
But they also got so much right:
   - The database is all HTTP, all the time. Connecting up your
     choice language takes about an hour.
   - Offline replication and database streaming, standardized at the
     protocol level, which allows you to use various combinations of
     CouchDB, Couchbase, Coucbase Lite, and PouchDB without interop
     problems. Plus, it means in the early part of an app (like the 0.X
     bit), I can trivially replicate the prod DB down when I'm trying
     to repro something.
   - You can store your HTTP assets right alongside the DB for 
     Firebase-like asset hosting. Throw it behind a caching service
     for prod if you want.
   - You can store full-blown files, which is great for lots of practical
     app these days.
   - Trivial replication. The scaling of CouchDB itself is honestly a
     bit crappy, but Couchbase has great scaling, and since they speak
     the same protocol, you can easily scale from CouchDB to Couchbase
     without missing a beat.
