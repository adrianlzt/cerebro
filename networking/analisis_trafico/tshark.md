http://www.wireshark.org/docs/man-pages/tshark.html

tcpdump supervitaminado


https://twitter.com/glennzw/status/936220651093938180?s=09
tshark -ni en0 -Y "bootp.option.type == 53" -T fields -e bootp.option.hostname -e eth.src_resolved
See who's on the Starbucks WiFi with you
