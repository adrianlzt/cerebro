https://docs.ansible.com/ansible/2.6/plugins/lookup/cyberarkpassword.html

Lookup para obtener valores de cyberark

- name: passing options to the lookup
  debug: msg={{ lookup("cyberarkpassword", cyquery)}}
  vars:
    cyquery:
      appid: "app_ansible"
      query": "safe=CyberArk_Passwords;folder=root;object=AdminPass"
      output: "Password,PassProps.UserName,PassProps.Address,PasswordChangeInProcess"
