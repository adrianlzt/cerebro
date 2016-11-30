#pragma strict

var coinEffect : Transform;
var coinValue = 1;

function OnTriggerEnter (info : Collider)
{
	if (info.tag == "Player")
	{
		GameMaster.currentScore += coinValue;
		var effect = Instantiate(coinEffect, transform.position, transform.rotation);
		Destroy(effect.gameObject, 3);
		Destroy(gameObject);
	}
}