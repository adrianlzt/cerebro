#pragma strict

var maxFallDistance = -10;

var gameMaster : GameMaster;

function Update ()
{
	if (transform.position.y <= maxFallDistance)
	{
		if (GameMaster.isRestarting == false)
		{
			if (gameMaster != null) {
				gameMaster.RestartLevel();
			}
		}
	}
}