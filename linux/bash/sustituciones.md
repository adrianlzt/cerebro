https://tenebrousedge.github.io/shell_guide/


Caret substitution:
  # systemctl status mysql.service
  -- snip output --
  # ^status^restart
  systemctl restart mysql.service


Global substitution (and history shortcut):
  $ echo "We're all mad here. I'm mad. You're mad."
  we're all mad here. I'm mad. You're mad.
  $ !!:gs/mad/HN/
  we're all HN here. I'm HN. You're HN.

