## REACTIONS
       %{@LINE}
           The line matched.

       %{@MATCH}
           The substring matched

       %{@START}
           The starting position of the match from the beginning of the string.

       %{@END}
           The ending position of the match.

       %{@LENGTH}
           The length of the match

       %{@JSON}
           The full set of patterns captured, encoded as a json dictionary as a structure of { pattern: [ array of captures ] }. We use an array becuase you can use
           the same named pattern multiple times in a match.
