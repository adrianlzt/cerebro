#pragma strict

var rotationSpeed = 100;
var jumpHeight = 8;

private var isFalling = false;

function Update ()
{
	//Handle ball rotation.
	var rotation : float = Input.GetAxis ("Horizontal") * rotationSpeed;
	rotation *= Time.deltaTime;
	rigidbody.AddRelativeTorque (Vector3.back * rotation);
	
	if (Input.GetKeyDown(KeyCode.W) && isFalling == false)
	{
		rigidbody.velocity.y = jumpHeight;
	}
	isFalling = true;
}

function OnCollisionStay ()
{
	isFalling = false;
}