#pragma strict

var player : Rigidbody;
var bounceAmount = 10f;

var deathParticles : Transform;

function Die () {
	player.rigidbody.velocity.y = bounceAmount;
	Instantiate (deathParticles, transform.position, transform.rotation);
	Destroy (gameObject);
}