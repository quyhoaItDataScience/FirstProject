const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const currentEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.querySelector(".progress");
const progressContainer = document.getElementById("progress-container");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// Music
const songs = [
  {
    name: "Treat You Better",
    displayName: "Treat You Better",
    artist: "Shawn Mendes",
  },
  {
    name: "Yêu Từ Đâu Mà Ra",
    displayName: "Yêu từ đâu mà ra",
    artist: "Lil Zpoet",
  },
  {
    name: "Gác Lại Âu Lo",
    displayName: "Gác Lại Âu Lo",
    artist: "DaLat",
  },
  {
    name: "Grateful",
    displayName: "Grateful",
    artist: "Neffex",
  },
  {
    name: "Em Có Nghe",
    displayName: "Em Có Nghe",
    artist: "Kha",
  },
  {
    name: "Chỉ Muốn Bên Em Lúc Này",
    displayName: "Chỉ Muốn Bên Em Lúc Này",
    artist: "Huy Vạc",
  },
  {
    name: "Dịu Dàng Em Đến",
    displayName: "Dịu Dàng Em Đến",
    artist: "Erik",
  },
];
// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `../images/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
  const { currentTime, duration } = e.srcElement;
  // Set progress width
  let progressWidth = (currentTime / duration) * 100;
  progress.style.width = `${progressWidth}%`;
  // Calculate current time
  let currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);
  if (currentSeconds < 10) {
    currentSeconds = `0${currentSeconds}`;
  }
  currentEl.textContent = `${currentMinutes}:${currentSeconds}`;
  // Calculate duration
  let durationMinutes = Math.floor(duration / 60);
  let durationSeconds = Math.floor(duration % 60);
  if (durationSeconds < 10) {
    durationSeconds = `0${durationSeconds}`;
  }
  if (durationSeconds) {
    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
