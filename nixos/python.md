https://serokell.io/blog/practical-nix-flakes#:~:text=naersk-,Python%20(poetry),-Python%20ecosystem%20is

Meter dependencias externas
https://discourse.nixos.org/t/poetry2nix-flakes-add-runtime-dependencies/15930/6


packages.app = poetry2nix.mkPoetryApplication {
    ...
    propagatedBuildInputs = [
        ffmpeg
        ripgrep
    ];
};
