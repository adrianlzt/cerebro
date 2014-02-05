Validate that all passed values are either true or false. Abort catalog compilation if any value fails this check.

validate_absolute_path
validate_array
validate_augeas
validate_bool
validate_cmd
validate_hash
validate_re
validate_slength
validate_string


$iamtrue = true
validate_bool(true)
validate_bool(true, true, false, $iamtrue)


$some_array = [ true ]
validate_bool("false")
validate_bool("true")
validate_bool($some_array)
