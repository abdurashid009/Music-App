const fileInput = document.getElementById("fileInput");
const audioPlayer = document.getElementById("audioPlayer");
const playlist = document.getElementById("playlist");
const volumeControl = document.getElementById("volumeControl");

let tracks = [];
let currentTrackIndex = 0;

fileInput.addEventListener("change", function () {
  const files = Array.from(this.files);
  playlist.innerHTML = "";
  tracks = files;

  files.forEach((file, index) => {
    const li = document.createElement("li");
    li.textContent = file.name;
    li.onclick = () => playTrack(index);
    playlist.appendChild(li);
  });

  if (tracks.length > 0) {
    playTrack(0);
  }
});

function playTrack(index) {
  currentTrackIndex = index;
  const file = tracks[index];
  const url = URL.createObjectURL(file);
  audioPlayer.src = url;
  audioPlayer.play();
  updatePlaylistUI();
}

function updatePlaylistUI() {
  const items = playlist.querySelectorAll("li");
  items.forEach((li, idx) => {
    li.classList.toggle("active", idx === currentTrackIndex);
  });
}

function playAudio() {
  audioPlayer.play();
}

function pauseAudio() {
  audioPlayer.pause();
}

function stopAudio() {
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
}

function nextTrack() {
  if (currentTrackIndex < tracks.length - 1) {
    playTrack(currentTrackIndex + 1);
  }
}

function prevTrack() {
  if (currentTrackIndex > 0) {
    playTrack(currentTrackIndex - 1);
  }
}

volumeControl.addEventListener("input", function () {
  audioPlayer.volume = this.value;
});
