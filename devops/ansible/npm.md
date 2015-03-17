http://docs.ansible.com/npm_module.html

description: Install "coffee-script" node.js package.
- npm: name=coffee-script path=/app/location

description: Install "coffee-script" node.js package on version 1.6.1.
- npm: name=coffee-script version=1.6.1 path=/app/location

description: Install "coffee-script" node.js package globally.
- npm: name=coffee-script global=yes

description: Remove the globally package "coffee-script".
- npm: name=coffee-script global=yes state=absent
