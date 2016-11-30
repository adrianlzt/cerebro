#pragma strict

var rotationSpeed = 100;
var jumpHeight = 8;

var Hit01 : AudioClip;
var Hit02 : AudioClip;
var Hit03 : AudioClip;

var distToGround : float;

function Start () {
	// Getting the distance from the center to the ground.
	distToGround = collider.bounds.extents.y;
}

function Update ()
{
	//Handle ball rotation.
	var rotation : float = Input.GetAxis ("Horizontal") * rotationSpeed;
	rotation *= Time.deltaTime;
	rigidbody.AddRelativeTorque (Vector3.back * rotation);
	
	if (Input.GetKeyDown(KeyCode.W) && IsGrounded ())
	{
		rigidbody.velocity.y = jumpHeight;
	}
}

function IsGrounded () : boolean { //Check if we are on the ground. Return true if we are else return null.
	return Physics.Raycast(transform.position, -Vector3.up, distToGround + 0.1);
}

function OnCollisionEnter () {
	var theHit = Random.Range(0, 3);
	if (theHit == 0)
	{
		audio.clip = Hit01;
	}
	else if (theHit == 1)
	{
		audio.clip = Hit02;
	}
	else {
		audio.clip = Hit03;
	}
	audio.pitch = Random.Range (0.9,1.1);
	audio.Play();
}