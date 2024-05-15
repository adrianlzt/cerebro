# env_logger
https://docs.rs/env_logger/latest/env_logger/

A simple logger that can be configured via environment variables, for use with the logging facade exposed by the log crate.

```rust
use log::{debug, error, log_enabled, info, Level};

env_logger::init();

debug!("this is a debug {}", "message");
error!("this is printed by default");
```
