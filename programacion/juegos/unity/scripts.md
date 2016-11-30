https://docs.unity3d.com/es/current/Manual/CreatingAndUsingScripts.html
https://docs.unity3d.com/es/current/ScriptReference/index.html

# Start
Se ejecuta cuando comenzamos el juego

# Update
Llamada cada vez que se renderiza un nuevo frame


# Controles
El juego mapea las teclas 'asdw' y las flechas a esta variable. Los valores varian entre 0 y 1 (dependiendo de si le damos un toque o la dejamos presionada)
Input.GetAxis("Horizontal")
Input.GetAxis("Vertical")

## Teclas presionadas
Input.GetKeyDown(KeyCode.W)
sera true si presionamos la w


# Logger / Debug
https://docs.unity3d.com/ScriptReference/Debug.html
Debug.Log("I am alive!");


# Variables
Si definimos variables globales en el script aparecerán como propiedades del objeto en la UI.



# Componentes / Interactuando con el ojecto
Si el objecto tiene el componen RigidBody tendremos una variable "rigidbody" disponible con funciones que podremos ejecutar.
https://docs.unity3d.com/es/current/ScriptReference/Rigidbody.html

Para acceder a esta variable: this.GetComponent.<Rigidbody>()
Tipicamente definiremos una variable global:
var rb: Rigidbody;
Y en el Start() pondremos:
rb = GetComponent.<Rigidbody>();

Funciones típicas para este component:
AddForce() y AddTorque()

Tambien podemos definir una velocidad (que luego ira perdiendo por la gravedad)
rb.velocity = Vector3.up * 15;
  salta un poco para una masa de 1kg

Algo parecido aplicando fuerza:
rb.AddRelativeForce(Vector3.up * 300);



# Collision
Cuando nuestro objeto colisione con algo se llamará al handler
OnCollisionStay()



# Vectores
Tenemos unas variables para definir direcciones, diferentes para 2d y 3d (y uno para 4d, casos especiales).

## Vector3
https://docs.unity3d.com/es/current/ScriptReference/Vector3.html

back		Shorthand for writing Vector3(0, 0, -1).
down		Shorthand for writing Vector3(0, -1, 0).
forward	Shorthand for writing Vector3(0, 0, 1).
left		Shorthand for writing Vector3(-1, 0, 0).
one			Shorthand for writing Vector3(1, 1, 1).
right		Shorthand for writing Vector3(1, 0, 0).
up			Shorthand for writing Vector3(0, 1, 0).
zero		Shorthand for writing Vector3(0, 0, 0).


# Movimiento / Mover
Si queremos que el movimiento vaya adecuado a nuestra capacidad de render en vez de al tiempo real añadiremos:
variableQueControlaCuantoNosMovemos *= Time.deltaTime;

objeto.transform.position.y

ojecto.transform.position = new Vector3(0, separacion*i, 0);



# Botones
El botón funcionará cuando estemos en modo "Play"
function OnGUI () {
    if (GUI.Button (Rect (10,10,150,100), "I am a button"))
        print ("You clicked the button!");
}



# Scripts que se ejecutan en modo edición
https://docs.unity3d.com/ScriptReference/ExecuteInEditMode.html

Poniendo esto al principio

[ExecuteInEditMode]
public class CreateRope : MonoBehaviour {

// Make the script also execute in edit mode.
@script ExecuteInEditMode()

Hacemos que los scripts se ejecuten en modo editor




# Buscar objetos
https://docs.unity3d.com/ScriptReference/GameObject.Find.html

hand = GameObject.Find("Hand");



# Crear objeto
https://docs.unity3d.com/ScriptReference/GameObject.Find.html

GameObject player;
player = new GameObject("Player");
player.AddComponent<Rigidbody>()

var player: GameObject;
player = new GameObject("Player");
player.AddComponent.<Rigidbody>();
player.AddComponent.<BoxCollider>();



# Parent / Children
https://docs.unity3d.com/ScriptReference/Transform.SetParent.html

Definir padre de un objeto

var nuevaCuerda: GameObject;
nuevaCuerda = new GameObject("Nueva_Cuerda");

var box: GameObject;
box = new GameObject("box");
box.transform.SetParent(nuevaCuerda.transform);
