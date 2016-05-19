package main

import (
	"math"

	"github.com/olorin/nagiosplugin"
)

func main() {
	// Initialize the check - this will return an UNKNOWN result
	// until more results are added.
	check := nagiosplugin.NewCheck()
	// If we exit early or panic() we'll still output a result.
	defer check.Finish()

	// obtain data here

	// Add an 'OK' result - if no 'worse' check results have been
	// added, this is the one that will be output.
	check.AddResult(nagiosplugin.OK, "everything looks shiny, cap'n")
	// Add some perfdata too (label, unit, value, min, max,
	// warn, crit). The math.Inf(1) will be parsed as 'no
	// maximum'.
	check.AddPerfDatum("badness", "kb", 3.14159, 0.0, math.Inf(1), 8000.0, 9000.0)

	// Parse a range from the command line and warn on a match.
	// Warning si no esta entre 1 y 2
	warnRange, err := nagiosplugin.ParseRange("1:2")
	if err != nil {
		check.AddResult(nagiosplugin.UNKNOWN, "error parsing warning range")
	}
	if warnRange.Check(3.14159) {
		check.AddResult(nagiosplugin.WARNING, "Fuera del umbral warning")
	}

	// Critica si pasa de 5
	// Si queremos que nos avise si baja de 5 pondremos: @5
	critRange, err := nagiosplugin.ParseRange("5")
	if err != nil {
		check.AddResult(nagiosplugin.UNKNOWN, "error parsing critical range")
	}
	if critRange.Check(10) {
		check.AddResult(nagiosplugin.CRITICAL, "Fuera del umbral critico")
	}
}
