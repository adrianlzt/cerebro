#pragma strict

import UnityEngine.UI;

var scoreText : Text;

function Start ()
{
	scoreText.text = "SCORE: " + GameMaster.finalScore;
}