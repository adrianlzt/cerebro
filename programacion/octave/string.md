# Lower case
lower("AAA")


# Regexp
regexprep(email_contents, '<[^<>]+>', ' ');

> regexprep("foo bar foo.", 'ba.', '___')
ans = foo ___ foo.



# Split / tokenizar / strtok
Se usa cualquier de los caracteres del segundo parámetro como separadores.
> [tok,rem] = strtok("foo;bar", ".-:;")
tok = foo
rem = ;bar


