http://docs.ansible.com/wait_for_module.html

Waits for a condition before continuing.

# Wait 300 seconds for port 22 to become open and contain "OpenSSH", don't start checking for 10 seconds
- local_action: wait_for port=22 host="{{ inventory_hostname }}" search_regex=OpenSSH delay=10

# wait 300 seconds for port 8000 to become open on the host, don't start checking for 10 seconds
# reintenta cada 5s
# desiste tras 100s
- wait_for:
    port: 8000
    delay: 10
    sleep: 5
    timeout: 100


mirar uri.md si lo que queremos es ver que una URL esté disponible
