https://flutter.dev/docs/development/ui/advanced/gestures
https://flutter.dev/docs/development/ui/interactive


Si queremos pulsar sobre algo, lo recubriremos con InkWell o GestureDectector
You can wrap your Container in an InkWell or GestureDetector. The difference is that InkWell is a material widget that shows a visual indication that the touch was received, whereas GestureDetector is a more general purpose widget that shows no visual indicator.



# Botones
IconButton(
  onPressed: onPressed,
  icon: Icon(Icons.add)
)

GestureDetector(
      onTap: _handleTap,
      child: Container(...)
)
