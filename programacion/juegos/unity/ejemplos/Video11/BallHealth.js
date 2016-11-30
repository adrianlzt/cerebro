#pragma strict

var maxFallDistance = -10;
private var isRestarting = false;

var GameOverSound : AudioClip;

function Update ()
{
	if (transform.position.y <= maxFallDistance)
	{
		if (isRestarting == false)
		{
			RestartLevel();
		}
	}
}

function RestartLevel () {
	isRestarting = true;
	audio.pitch = 1;
	audio.clip = GameOverSound;
	audio.Play();
	yield WaitForSeconds (audio.clip.length);
	Application.LoadLevel("Level01");
}