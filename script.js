const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const shuffleBtn = document.getElementById('shuffle'); // Shuffle Button

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.getElementById('currTime');
const durTime = document.getElementById('durTime');

let isShuffle = false;
let lastSongIndex = -1;

const songs = [
  'khatta_Flow', 'Namastute', 'Nanchaku', 'Hola_Amigo', 
  'lukka_chippi', 'nalla_free4tyle', 'raatkirani', 'swaah','Aaj_Bhi','Ishq_Mein','Jannatein_Kahan','Khwaab','Maahi','Mat_Aazma_Re','Sun_Saathiya','Sahiba',
,'Tera_Mera_Rishta','Toh_Phir_Aao','Tumhare_Hi_Rahenge_Hum'];

let songIndex = 0;

// Load song into DOM
function loadSong(song) {
  title.innerText = song.replace(/_/g, " ");
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;

  audio.addEventListener('loadedmetadata', () => {
    let min_d = Math.floor(audio.duration / 60);
    let sec_d = Math.floor(audio.duration % 60);
    durTime.innerText = `${min_d}:${sec_d < 10 ? '0' + sec_d : sec_d}`;
  });
}

// Load first song initially
loadSong(songs[songIndex]);

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  audio.pause();
}

// Previous song
function prevSong() {
  songIndex = songIndex - 1 < 0 ? songs.length - 1 : songIndex - 1;
  loadSong(songs[songIndex]);
  playSong();
}

// Next song
function nextSong() {
  if (isShuffle) {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * songs.length);
    } while (newIndex === lastSongIndex);
    lastSongIndex = newIndex;
    songIndex = newIndex;
  } else {
    songIndex = (songIndex + 1) % songs.length;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Shuffle Function
function toggleShuffle() {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle('active', isShuffle);
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  let min = Math.floor(currentTime / 60);
  let sec = Math.floor(currentTime % 60);
  currTime.innerText = `${min}:${sec < 10 ? '0' + sec : sec}`;
}

// Set song progress
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Event Listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
shuffleBtn.addEventListener('click', toggleShuffle);

audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);

// Background Animation Script
const animatedBg = document.querySelector('.animated-bg');
let scaleFactor = 1;

function animateBackground() {
  scaleFactor = scaleFactor === 1 ? 1.5 : 1;
  animatedBg.style.transform = `scale(${scaleFactor})`;
  animatedBg.style.opacity = scaleFactor === 1 ? 1 : 0.5;
}

setInterval(animateBackground, 5000);

// Menu Bar Functionality
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
});

document.getElementById('myVerse').addEventListener('click', function () {
	const maxWidth = window.innerWidth - this.clientWidth;
	const maxHeight = window.innerHeight - this.clientHeight;
  
	const randomX = Math.floor(Math.random() * maxWidth);
	const randomY = Math.floor(Math.random() * maxHeight);
  
	this.style.left = randomX + 'px';
	this.style.top = randomY + 'px';
  });
  
  function toggleMenu() {
	document.querySelector(".menu-bar").classList.toggle("active");
  }

  function toggleDropdown() {
	document.getElementById("playlist-dropdown").classList.toggle("show");
  }
  
  // Close dropdown if clicked outside
  window.onclick = function(event) {
	if (!event.target.matches('.dropbtn')) {
	  var dropdowns = document.getElementsByClassName("dropdown-content");
	  for (var i = 0; i < dropdowns.length; i++) {
		var openDropdown = dropdowns[i];
		if (openDropdown.classList.contains("show")) {
		  openDropdown.classList.remove("show");
		}
	  }
	}
  };

  document.getElementById('contact-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default navigation
    window.location.href = "tel:+1234567890";
});





  
