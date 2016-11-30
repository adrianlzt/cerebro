#pragma strict

static var currentScore : int = 0;
static var isRestarting = false;

var player : Transform;

var offsetY : float = 40;
var sizeX : float = 100;
var sizeY : float = 40;

var musicPrefab : Transform;

var GameOverSound : AudioClip;

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

function RestartLevel () {
	isRestarting = true;
	audio.pitch = 1;
	audio.clip = GameOverSound;
	audio.Play();
	yield WaitForSeconds (audio.clip.length);

	player.position = CheckPoint.ReachedPoint;
	isRestarting = false;
}