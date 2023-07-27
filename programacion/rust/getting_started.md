To compile and run a Rust program, you can use the rustc command, which is the Rust compiler, or the cargo command, which is the Rust package manager and build tool. Here are the steps for both options:

Using rustc:

•  Write your Rust code in a file with the .rs extension, such as main.rs.

•  To compile your code, run rustc main.rs in your terminal. This will produce an executable file named main or main.exe depending on your operating system.

•  To run your program, run ./main or .\main.exe in your terminal. You should see the output of your program.

Using cargo:

•  To create a new project with a "Hello, world!" program, run cargo new hello_world in your terminal. This will generate a directory named hello_world with some files and folders, including a src folder that contains a file named main.rs with the Rust code.

•  To compile and run your program, move into the new directory and run cargo run in your terminal. This will build your project and execute the binary file. You should see the output of your program.

A simple "Hello, world!" program in Rust looks like this:

// This is a comment

// This function is the entry point of the program
fn main() {
// This macro prints text to the standard output
println!("Hello, world!");
}
