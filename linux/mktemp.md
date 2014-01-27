mktemp - create a temporary file or directory

Create  a  temporary  file or directory, safely, and print its name.  TEMPLATE must contain at least 3 consecutive 'X's in last component.  If TEMPLATE is not specified, use tmp.XXXXXXXXXX, and --tmpdir is implied.  Files are created u+rw, and directories u+rwx, minus umask restrictions.
