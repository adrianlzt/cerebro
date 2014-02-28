https://access.redhat.com/site/solutions/53031

Why does Red Hat Enterprise Linux 6 invalidate / discard packets when the route for outbound traffic differs from the route of incoming traffic?

To accept asymmetrically routed (outgoing routes and incoming routes are different) packets set "rp_filter" to 2 and restart networking, by running the following commands:
    # echo 2 > /proc/sys/net/ipv4/conf/default/rp_filter
    # echo 2 > /proc/sys/net/ipv4/conf/all/rp_filter
