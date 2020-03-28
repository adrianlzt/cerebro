https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/4/html/Reference_Guide/s2-proc-modules.html

The first column contains the name of the module.
The second column refers to the memory size of the module, in bytes.
The third column lists how many instances of the module are currently loaded. A value of zero represents an unloaded module.
The fourth column states if the module depends upon another module to be present in order to function, and lists those other modules.
The fifth column lists what load state the module is in: Live, Loading, or Unloading are the only possible values.
The sixth column lists the current kernel memory offset for the loaded module. This information can be useful for debugging purposes, or for profiling tools such as oprofile.
