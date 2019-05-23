http://cbonte.github.io/haproxy-dconv/1.9/configuration.html#7.3.2-env

http-request add-header Via 1.1\ %[env(HOSTNAME)]
