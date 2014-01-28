http://www.cl.cam.ac.uk/research/security/capsicum/

Capsicum is a lightweight OS capability and sandbox framework developed at the University of Cambridge Computer Laboratory, supported by a grant from Google. Capsicum extends the POSIX API, providing several new OS primitives to support object-capability security on UNIX-like operating systems:

capabilities - refined file descriptors with fine-grained rights
capability mode - process sandboxes that deny access to global namespaces
process descriptors - capability-centric process ID replacement
anonymous shared memory objects - an extension to the POSIX shared memory API to support anonymous swap objects associated with file descriptors (capabilities)
rtld-elf-cap - modified ELF run-time linker to construct sandboxed applications
libcapsicum - library to create and use capabilities and sandboxed components
libuserangel - library allowing sandboxed applications or components to interact with user angels, such as Power Boxes.
chromium-capsicum - a version of Google's Chromium web browser that uses capability mode and capabilities to provide effective sandboxing of high-risk web page rendering.
