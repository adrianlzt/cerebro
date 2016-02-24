http://blog.dustinkirkland.com/2016/02/zfs-is-fs-for-containers-in-ubuntu-1604.html

https://wiki.ubuntu.com/Kernel/Reference/ZFS


This is phenomenal news! Are there any concerns with running ZFS on systems without ECC RAM (e.g. laptops or desktops) due to the risk of corruption during error checking?
Don't believe the hype. ECC is good, but not mandatory. Great explanation here: http://jrs-s.net/2015/02/03/will-zfs-and-non-ecc-ram-kill-your-data/

 
Canonical admit ZFS is GPL-incompatible: https://wiki.ubuntu.com/ZFS but merges it into their kernel tree anyways: http://kernel.ubuntu.com/git/ubuntu/ubuntu-xenial.git/commit/zfs?id=b65ce14d3445e8fe69b5d59aaaf2699319714179
