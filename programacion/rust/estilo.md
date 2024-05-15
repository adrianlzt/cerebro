# Evitar estados mutables
The functional programming style prefers to minimize the amount of mutable state to make code clearer.

```rust
contents
   .lines()
   .filter(|line| line.contains(query))
   .collect()
```
