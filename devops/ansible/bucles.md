    - name: install packages loop
      yum: name={{ item }} state=present
      with_items:
        - vim-enhanced
        - screen
        - nano
        - mlocate
