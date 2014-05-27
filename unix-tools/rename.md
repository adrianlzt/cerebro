man rename

For example, to rename all files matching "*.bak" to strip the extension, you might say
  rename 's/\.bak$//' *.bak

To translate uppercase names to lower, you'd use
  rename 'y/A-Z/a-z/' *
