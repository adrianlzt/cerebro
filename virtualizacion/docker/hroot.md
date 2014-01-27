https://github.com/polydawn/hroot

Hroot provides transports and straightforward configuration files for Docker.
Strongly version your containers, then distribute them offline or over SSH & HTTP with git!

Docker's image storage is treated like a cache, while Hroot manages your images using git as a persistent storage backend. Your containers now have effortless history, strong hashes to verify integrity, git commit messages, and secure transport.

Further, ditch those long config flags and express them in a file instead. Hroot looks for a hroot.toml file in the current directory and sets up binds, mounts, etc. Add that file to your project's version control and get your entire team working on the same system.
