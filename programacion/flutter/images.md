https://flutter.dev/docs/development/ui/assets-and-images


# Images
Para poder usar una imagen debemos seguir varios pasos.

Almacenar el fichero en el proyecto, por ejemplo en images/lake.jpg

Actualizar pubspec.yaml e incluirla en la sección de assets:
flutter:
  uses-material-design: true
  assets:
      - images/lake.jpg

Crear el widget
Image.asset(
  'images/lake.jpg',
  width: 600,
  height: 240,
  fit: BoxFit.cover,  // the image should be as small as possible but cover its entire render box.
),
