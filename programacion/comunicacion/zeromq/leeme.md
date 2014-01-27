http://zeromq.org

ØMQ (also seen as ZeroMQ, 0MQ, zmq) looks like an embeddable networking library but acts like a concurrency framework. It gives you sockets that carry atomic messages across various transports like in-process, inter-process, TCP, and multicast. You can connect sockets N-to-N with patterns like fanout, pub-sub, task distribution, and request-reply. It's fast enough to be the fabric for clustered products. Its asynchronous I/O model gives you scalable multicore applications, built as asynchronous message-processing tasks. It has a score of language APIs and runs on most operating systems. ØMQ is from iMatix and is LGPLv3 open source.


We’ve also added much more control and visibility into how our queuing system works because the current one is almost like a black box because ZeroMQ is not great at being transparent with regards to what’s actually happening.
https://blog.serverdensity.com/using-celery-for-queuing-requests/
