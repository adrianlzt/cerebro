switch day
  when "Mon" then go work
  when "Tue" then go relax
  when "Thu"
    go iceFishing
  when "Fri", "Sat"
    if day is bingoDay
      go bingo
      go dancing
  when "Sun" then go church
  else go work
