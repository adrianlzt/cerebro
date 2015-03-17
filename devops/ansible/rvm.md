https://github.com/rvm/rvm1-ansible

mkdir roles/
ansible-galaxy install rvm_io.rvm1-ruby -r roles/


  roles:
  ¦ - { role: rvm_io.rvm1-ruby, rvm1_rubies: ['ruby-2.0.0'], tags: ruby }
