#pragma strict

static var currentScore : int = 0;

var offsetY : float = 40;
var sizeX : float = 100;
var sizeY : float = 40;

var musicPrefab : Transform;

function Start () {
	currentScore = 0;
	
	if (!GameObject.FindGameObjectWithTag("MM")) {
		var mManager = Instantiate (musicPrefab, transform.position, Quaternion.identity);
		mManager.name = musicPrefab.name;
		DontDestroyOnLoad (mManager);
	}
}

function OnGUI () {
	GUI.Box (new Rect (Screen.width/2-sizeX/2, offsetY, sizeX, sizeY), "Score: " + currentScore);
}