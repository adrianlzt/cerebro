# Hello packaging friend!
#
# If you find yourself using this 'fpm --edit' feature frequently, it is
# a sign that fpm is missing a feature! I welcome your feature requests!
# Please visit the following URL and ask for a feature that helps you never
# need to edit this file again! :)
#   https://github.com/jordansissel/fpm/issues
# ------------------------------------------------------------------------

# Disable the stupid stuff rpm distros include in the build process by default:
#   Disable any prep shell actions. replace them with simply 'true'
%define __spec_prep_post true
%define __spec_prep_pre true
#   Disable any build shell actions. replace them with simply 'true'
%define __spec_build_post true
%define __spec_build_pre true
#   Disable any install shell actions. replace them with simply 'true'
%define __spec_install_post true
%define __spec_install_pre true
#   Disable any clean shell actions. replace them with simply 'true'
%define __spec_clean_post true
%define __spec_clean_pre true
# Disable checking for unpackaged files ?
#%undefine __check_files

# Use md5 file digest method
%define _binary_filedigest_algorithm 1

# Use gzip payload compression
%define _binary_payload w9.gzdio 


Name: dsmctools-cyclops-basic
Version: 0.1.0
Release: 1
Summary: no description given
AutoReqProv: no
# Seems specifying BuildRoot is required on older rpmbuild (like on CentOS 5)
# fpm passes '--define buildroot ...' on the commandline, so just reuse that.
BuildRoot: %buildroot
# Add prefix, must not end with /

Prefix: /

Group: default
License: unknown
Vendor: adrian@adrian-Presario
URL: http://example.com/no-uri-given
Packager: <adrian@adrian-Presario>

Requires: tdaf-api-cyclops-agent
Requires: dsmctools-commonlinux-calltrace
Requires: dsmctools-commonlinux-cpu
Requires: nagios-plugins-disk
Requires: dsmctools-commonlinux-fswritable
Requires: nagios-plugins-load
Requires: dsmctools-commonlinux-mountpointsnfs
Requires: dsmctools-commonlinux-netinterfaces
Requires: dsmctools-commonlinux-openfds
Requires: dsmctools-commonlinux-openfiles
Requires: dsmctools-commonlinux-memory
Requires: nagios-plugins-procs
Requires: nagios-plugins-ssh
Requires: nagios-plugins-swap
Requires: dsmctools-commonlinux-uptime
Requires: nagios-plugins-users
%description
no description given

%prep
# noop

%build
# noop

%install
# noop

%clean
# noop



%files
%defattr(-,root,root,-)

# Reject config files already listed or parent directories, then prefix files
# with "/", then make sure paths with spaces are quoted. I hate rpm so much.
/etc/tdaf-api-cyclops-agent/conf.d/check_calltrace
/etc/tdaf-api-cyclops-agent/conf.d/check_cpu
/etc/tdaf-api-cyclops-agent/conf.d/check_disk
/etc/tdaf-api-cyclops-agent/conf.d/check_fs_writable
/etc/tdaf-api-cyclops-agent/conf.d/check_load
/etc/tdaf-api-cyclops-agent/conf.d/check_mountpoints
/etc/tdaf-api-cyclops-agent/conf.d/check_netinterfaces
/etc/tdaf-api-cyclops-agent/conf.d/check_open_fds
/etc/tdaf-api-cyclops-agent/conf.d/check_open_files
/etc/tdaf-api-cyclops-agent/conf.d/check_pmp_memory
/etc/tdaf-api-cyclops-agent/conf.d/check_proc_zombie
/etc/tdaf-api-cyclops-agent/conf.d/check_ssh
/etc/tdaf-api-cyclops-agent/conf.d/check_swap
/etc/tdaf-api-cyclops-agent/conf.d/check_uptime
/etc/tdaf-api-cyclops-agent/conf.d/check_users

%changelog

