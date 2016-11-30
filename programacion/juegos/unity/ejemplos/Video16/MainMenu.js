#pragma strict

var music : AudioSource;

function QuitGame () {
	Debug.Log ("Game is exiting...");
	Application.Quit ();
}

function StartGame (level : String) {
	Application.LoadLevel (level);
}

function SetGameVolume (vol : float) {
	music.volume = vol;
}