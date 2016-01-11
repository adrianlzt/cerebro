https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#3.2

var x: number;          // Explicitly typed  
var y = 0;              // Same as y: number = 0  
var z = 123.456;        // Same as z: number = 123.456  
var s = z.toFixed(2);   // Property of Number interface


# Boolean
var b: boolean;         // Explicitly typed  
var yes = true;         // Same as yes: boolean = true  
var no = false;         // Same as no: boolean = false

# String
var s: string;          // Explicitly typed  
var empty = "";         // Same as empty: string = ""  
var abc = 'abc';        // Same as abc: string = "abc"  
var c = abc.charAt(2);  // Property of String interface

# symbol
var secretKey = Symbol();  
var obj = {};  
obj[secretKey] = "secret message";  // Use symbol as property key  
obj[Symbol.toStringTag] = "test";   // Use of well-known symbol

# void / null / undefined
var n: number = null;   // Primitives can be null  
var x = null;           // Same as x: any = null  
var e: Null;            // Error, can't reference Null type

var n: number;          // Same as n: number = undefined  
var x = undefined;      // Same as x: any = undefined  
var e: Undefined;       // Error, can't reference Undefined type

# array
var a: string[] = ["hello", "world"];

# tuples
var t: [number, string] = [3, "three"];  
var n = t[0];  // Type of n is number  
var s = t[1];  // Type of s is string  
var i: number;  
var x = t[i];  // Type of x is number | string


