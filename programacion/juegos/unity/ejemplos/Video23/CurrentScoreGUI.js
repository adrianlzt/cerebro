#pragma strict

import UnityEngine.UI;

var scoreText : Text;

function Update ()
{
	scoreText.text = "COINS COLLECTED: " + GameMaster.currentScore;
}