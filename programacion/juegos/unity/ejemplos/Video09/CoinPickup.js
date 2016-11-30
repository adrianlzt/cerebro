#pragma strict

var coinEffect : Transform;

function OnTriggerEnter (info : Collider)
{
	if (info.tag == "Player")
	{
		Debug.Log("Add coin counter here!");
		var effect = Instantiate(coinEffect, transform.position, transform.rotation);
		Destroy(effect.gameObject, 3);
		Destroy(gameObject);
	}
}