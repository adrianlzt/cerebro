String no mutable:
let hello = std::string::String::from("Hello, world!");

String mutable vacía:
use std::string::String;
let mut guess = String::new();

# parse
Parse mirará el tipo de dato que se espera y lo convertirá.
let parse: i32 = String::from("5").trim().parse().expect("Please type a number!");
let parse: u32 = "5".trim().parse().expect("Please type a number!");

Otra forma usando la sintaxis turbofish:
let four = "4".parse::<u32>().expect("Please type a number!");
