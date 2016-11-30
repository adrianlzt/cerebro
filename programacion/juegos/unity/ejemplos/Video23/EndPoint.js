#pragma strict

var gameMaster : GameMaster;

function OnTriggerEnter (colInfo : Collider)
{
	if (colInfo.tag == "Player")
	{
		gameMaster.LoadNextLevel();
	}
}