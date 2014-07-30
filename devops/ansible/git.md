http://docs.ansible.com/git_module.html

    - name: Download repo develop branch
      git: repo=git@pdihub.hi.inet:alt390/puppet-monitoring.git version=develop dest=/tmp/puppet-monitoring/dev recursive=no

version
What version of the repository to check out. This can be the full 40-character SHA-1 hash, the literal string HEAD, a branch name, or a tag name.
