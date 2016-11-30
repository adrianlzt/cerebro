#pragma strict

var rotationSpeed = 100;
var jumpHeight = 8;

private var playOnce = true;

var Hit01 : AudioClip;
var Hit02 : AudioClip;
var Hit03 : AudioClip;

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
		playOnceTrue();
	}
	isFalling = true;
}

function OnCollisionStay ()
{
	if (playOnce == true)
	{
		var theHit = Random.Range(0, 4);
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
		playOnce = false;
	}
	isFalling = false;
}

function playOnceTrue () {
	yield WaitForSeconds (0.2);
	playOnce = true;
}