Podemos usar la macro "dbg!" para imprimir mensajes de depuración en la consola. 
```rust
fn main() {
    let x = 42;
    dbg!(x);
}
```

Se puede introducir en medio de una función para ver el valor de una variable en un punto concreto de la ejecución. 
```rust
let request_id = dbg!(response_json.as_array().unwrap())
    .iter()
    .filter(|request| request["AccountId"] == account_id && request["AssetId"] == asset_id)
    .collect::<Vec<_>>()[0]["SshConnectionString"]
    .as_str()
    .unwrap();
```
