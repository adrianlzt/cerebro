#pragma strict

static var currentScore : int = 0;
static var finalScore : int = 0;
static var isRestarting = false;

var player : Transform;

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

function RestartLevel () {
	isRestarting = true;
	GetComponent.<AudioSource>().pitch = 1;
	GetComponent.<AudioSource>().clip = GameOverSound;
	GetComponent.<AudioSource>().Play();
	yield WaitForSeconds (GetComponent.<AudioSource>().clip.length);

	player.position = CheckPoint.ReachedPoint;
	
	var destructible : Destructible = player.GetComponent("Destructible") as Destructible;
	destructible.DeDestruct();
	
	isRestarting = false;
}

function LoadNextLevel ()
{
	finalScore += currentScore;
	Application.LoadLevel (Application.loadedLevel + 1);
}