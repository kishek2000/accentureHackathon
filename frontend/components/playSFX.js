export function playSFX() {
  // Path to audio files start from the project directory's public folder ('/' is the public directory)
  let audio = new Audio("/sfx/bubbles.mp3");
  console.log("PLAYING SOUND");
  audio.play();
}
