https://facebook.github.io/watchman/

Watches files and records, or triggers actions, when they change.

```bash
$ watchman watch ~/src
# the single quotes around '*.css' are important!
$ watchman -- trigger ~/src buildme '*.css' -- minify-css
```
