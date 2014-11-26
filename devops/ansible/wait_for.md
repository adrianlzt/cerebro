http://docs.ansible.com/wait_for_module.html

Waits for a condition before continuing.

# Wait 300 seconds for port 22 to become open and contain "OpenSSH", don't start checking for 10 seconds
- local_action: wait_for port=22 host="{{ inventory_hostname }}" search_regex=OpenSSH delay=10
