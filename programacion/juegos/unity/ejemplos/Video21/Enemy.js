#pragma strict

var player : Rigidbody;
var bounceAmount = 10f;

var deathParticles : Transform;

var colliders : Transform;

var enemyAnim : Animator;
private var centerAnim : Animator;

function Awake () {
	centerAnim = transform.GetComponent ("Animator") as Animator;
}

function Die () {
	player.GetComponent.<Rigidbody>().velocity.y = bounceAmount;
	Instantiate (deathParticles, enemyAnim.transform.position, enemyAnim.transform.rotation);
	enemyAnim.SetTrigger ("Die");
	centerAnim.SetTrigger ("Stop");
	Destroy (colliders.gameObject);
	//Destroy (gameObject);
}