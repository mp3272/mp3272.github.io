audioPlaying = true;
audioIcon = document.querySelector("#audio_on");
var audio = document.querySelector("audio");

audioIcon.addEventListener("click", function() {
	if (audioPlaying) {
		audioIcon.src = "assets/audio_off.svg";
		audio.pause();
	} else {
		audioIcon.src = "assets/audio_on.svg";
		audio.play();
	}
	audioPlaying = !audioPlaying;
});

//$(document).ready(function() {
//
//$("img", "#gifs-rows").hover(function() {
//  $('.preset-file').toggle();
//  $('.gif-file').toggle();
//});
//
//});