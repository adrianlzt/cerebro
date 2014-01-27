http://acme.com/software/http_load/

http_load runs multiple http fetches in parallel, to test the throughput of a web server. However unlike most such test clients, it runs in a single process, so it doesn't bog down the client machine. It can be configured to do https fetches as well.

You give it a file containing a list of URLs that may be fetched, a flag specifying how to start connections (either by rate or by number of simulated users), and a flag specifying when to quit (either after a given number of fetches or a given elapsed time). There are also optional flags for checksums, throttling, random jitter, and progress reports.
