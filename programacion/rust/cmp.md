The cmp method compares two values and can be called on anything that can be compared.
It takes a reference to whatever you want to compare with.
Then it returns a variant of the Ordering

```rust
use std::cmp::Ordering;

fn main() {
    let a = 5;
    let b = 10;

    match a.cmp(&b) {
        Ordering::Less => println!("a es menor que b"),
        Ordering::Greater => println!("a es mayor que b"),
        Ordering::Equal => println!("a es igual a b"),
    }
}
```
