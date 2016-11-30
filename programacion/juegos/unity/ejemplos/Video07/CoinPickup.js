#pragma strict

function OnTriggerEnter (info : Collider)
{
	if (info.tag == "Player")
	{
		Debug.Log("Add coin counter here!");
		Destroy(gameObject);
	}
}