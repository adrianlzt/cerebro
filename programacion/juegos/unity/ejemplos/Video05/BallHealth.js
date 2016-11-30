#pragma strict

var maxFallDistance = -10;

function Update ()
{
	if (transform.position.y <= maxFallDistance)
	{
		Application.LoadLevel("Level01");
	}
}