http://stackoverflow.com/questions/23929235/multi-line-string-with-extra-space-preserved-indentation

read -r -d '' VARIABLE <<- EOM
  This is line 1.
  This is line 2.
  Line 3.
EOM

echo "$VARIABLE"

