http://vim.wikia.com/wiki/Ranges

%Ranges       all lines (same as 1,$)    :%s/old/new/g
21,25         lines 21 to 25 inclusive   :21,25s/old/new/g
21,$21        lines 21 to end            :21,$s/old/new/g
.,$new        current line to end        :.,$s/old/new/g
