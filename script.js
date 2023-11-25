const music = document.querySelector("audio");
const prevBtn = document.querySelector("#prev");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");
const image = document.querySelector("img");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

// Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electirc Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Song 2",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Song 3",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Song 4",
    artist: "Jacinto Design",
  },
];

let isPlaying = false;

// play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// play or pause
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

//Curent Song
let songIndex = 0;

//Previous song
function prevsong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Next song
function nextsong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

//update the progress bar
function updatePorgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    //  console.log(duration,currentTime);
    //update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);

    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay fix
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    //Start time
    // Calculate display for duration
    const currentMinutes = Math.floor(currentTime / 60);

    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes};${currentSeconds}`;
  }
}

//set Progress Bar
function setProgressBar(e){
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const  {duration}= music;
  music.currentTime =((clickX /width )*duration)

}

// Event Listners for btn
prevBtn.addEventListener("click", prevsong);
nextBtn.addEventListener("click", nextsong);
music.addEventListener('ended',nextsong);
music.addEventListener("timeupdate", updatePorgressBar);
progressContainer.addEventListener("click", setProgressBar);
