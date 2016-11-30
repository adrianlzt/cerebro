#pragma strict

var gameMaster : GameMaster;

function OnTriggerEnter () {
	gameMaster.RestartLevel();
}