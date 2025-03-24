<https://github.com/Zouuup/landrun>
<https://news.ycombinator.com/item?id=43445662>

Run any Linux process in a secure, unprivileged sandbox using Landlock LSM. Think firejail, but lightweight, user-friendly, and baked into the kernel.

go install github.com/zouuup/landrun/cmd/landrun@latest

landrun --rox /usr/ --ro /path/to/dir ls /path/to/dir
