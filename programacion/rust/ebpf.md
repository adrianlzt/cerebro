git clone https://github.com/elbaro/mybee.git
cd mybee
docker run --rm -it -v $PWD:/mnt -w /mnt rust bash
cargo install bpf-linker
cargo b



cargo +nightly ...
