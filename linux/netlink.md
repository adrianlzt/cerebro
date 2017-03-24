netlink sockets are used to communicate with various kernel subsystems as an RPC system. man 7 netlink for more information.

Most kernel's process need communicate with user's process in Linux, but traditional Unix's IPC (pipe, message queue, shared memory and singal) can not offer a strong support for the communication between user's process and kernel. Linux provides a lot other methods which allow user's process can communicate with kernel, but they are very hard to use. To make these method easier to user for user, especially for Operational Engineer is the reason why we develop netlink.

libreria python para hablar netlink:
https://github.com/facebook/gnlpy

golang:
https://github.com/eleme/netlink
