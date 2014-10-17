#https://github.com/lehmannro/assert.sh
#Test unitarios en bash
#
#////////////////////////////////////////////////////////////////////////////////
#
#http://code.google.com/p/shunit2/

test_config_line_paths() {
    local s='partition cpm-all, 80-90,'

    returns "/a" "config_line_paths '$s /a, '"
    returns "/a /b/c" "config_line_paths '$s /a:/b/c, '"
    returns "/a /b /c" "config_line_paths '$s   /a  :    /b : /c, '"
}

config_line_paths() {
    local partition_line="$@"

    echo $partition_line \
        | csv_column 3 \
        | delete_spaces \
        | column 1 \
        | colons_to_spaces
}

source /usr/bin/shunit2
