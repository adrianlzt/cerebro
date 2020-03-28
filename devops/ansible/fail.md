http://docs.ansible.com/fail_module.html

# Example playbook using fail and when together
- fail:
    msg: "The system may not be provisioned according to the CMDB status."
  when: cmdb_status != "to-be-staged"


- name: fail the play if the previous command did not succeed
  fail:
    msg: "the command failed"
  when: "'FAILED' in command_result.stderr"

- name: pre-flight lb health check
  fail:
    msg: "Load Balancer not healthy, aborting deployment!"
  when: lb.balancer.status != 'ACTIVE'
