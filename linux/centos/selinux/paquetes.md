############
# Paquetes #
############

Utilidades: restorecon, secon, setfiles, semodule, load_policy, setsebool, audit2allow, audit2why, and chcat:
yum install policycoreutils-python

policycoreutils-gui provides system-config-selinux, a graphical tool for managing SELinux.

selinux-policy provides the SELinux Reference Policy
  Also provides the /usr/share/selinux/devel/policygentool development utility, as well as example policy files.

selinux-policy-targeted provides the SELinux targeted policy.

libselinux – provides an API for SELinux applications.

libselinux-utils provides the avcstat, getenforce, getsebool, matchpathcon, selinuxconlist, selinuxdefcon, selinuxenabled, setenforce, and togglesebool utilities.

libselinux-python provides Python bindings for developing SELinux applications

selinux-policy-mls provides the MLS SELinux policy.

setroubleshoot-server translates denial messages, produced when access is denied by SELinux, into detailed descriptions that are viewed with the sealert utility, also provided by this package.

setools-console – this package provides the Tresys Technology SETools distribution, a number of tools and libraries for analyzing and querying policy, audit log monitoring and reporting, and file context managemen

mcstrans translates levels, such as s0-s0:c0.c1023, to an easier to read form, such as SystemLow-SystemHigh
