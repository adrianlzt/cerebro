https://mitchellh.com/writing/nix-with-dockerfiles
https://github.com/mitchellh/flask-nix-example

Para meter dependencias externas:
https://discourse.nixos.org/t/poetry2nix-flakes-add-runtime-dependencies/15930/6

packages.app = poetry2nix.mkPoetryApplication {
    ...
    propagatedBuildInputs = [
        ffmpeg
        ripgrep
    ];
};