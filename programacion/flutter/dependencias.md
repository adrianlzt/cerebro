Se meten en pubspec.yaml

Si queremos especificar algo custom:
https://dart.dev/tools/pub/dependencies#git-packages

dependencies:
  kittens:
    git:
      url: git@github.com:munificent/kittens.git
      ref: some-branch


Forzar bajar de nuevo
flutter pub upgrade
