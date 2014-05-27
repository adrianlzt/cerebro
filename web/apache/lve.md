http://docs.cloudlinux.com/index.html?lve_pam_module.html

LVE is a kernel level technology developed by the CloudLinux team. The technology has common roots with container based virtualization and uses cgroups in its latest incarnation. It is lightweight, and transparent. The goal of LVE is to make sure that no single web site can bring down your web server.
Today, a single site can consume all CPU, IO, Memory resources or apache processes -- and bring the server to a halt.  LVE prevents that.  It is done via collaboration of apache module, PAM module and kernel.
