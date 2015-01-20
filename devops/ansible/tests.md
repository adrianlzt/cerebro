https://servercheck.in/blog/testing-ansible-roles-travis-ci-github

There are four main things I make sure I test when building and maintaining an Ansible role:

The role's syntax (are all the .yml files formatted correctly?).
Whether the role will run through all the included tasks without failing.
The role's idempotence (if run again, the role should not make any changes!).
The role's success (does the role do what it should be doing?).
