https://github.com/seanmonstar/warp

warp is a modern web server framework for Rust that makes it super easy to create web applications and APIs. It’s built on top of hyper, which is a fast HTTP implementation, and Tokio, which is an asynchronous runtime for Rust

```rust
use warp::Filter;

#[tokio::main]
async fn main() {
    // Define a route at `/hello` that responds with "Hello, World!"
    let hello_route = warp::path("hello")
        .map(|| "Hello, World!");

    // Start the warp server on localhost port 3030 and serve the `hello_route`
    warp::serve(hello_route)
        .run(([127, 0, 0, 1], 3030))
        .await;
}
```
