import { playList } from './playList.js';

let progress = document.getElementById('progress');
let song = document.getElementById('song');
let controlIcon = document.getElementById('ctrIcon');

// title, cover, album
const album = document.getElementById('album');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

let currentSongIndex = 0;
let currentAlbumIndex = 0;

// volume, icon
const volumeSlider = document.getElementById('volume-slider');
const volumeIcon = document.getElementById('volume-icon');

song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
};

window.playPause = function () {
  if (controlIcon.classList.contains('fa-pause')) {
    song.pause();
    controlIcon.classList.remove('fa-pause');
    controlIcon.classList.add('fa-play');
    setInterval(() => {
      progress.value = song.currentTime;
    }, 500);
  } else {
    song.play();
    controlIcon.classList.remove('fa-play');
    controlIcon.classList.add('fa-pause');
    setInterval(() => {
      progress.value = song.currentTime;
    }, 500);
  }
};

progress.onchange = function () {
  song.play();
  song.currentTime = progress.value;
  controlIcon.classList.add('fa-pause');
  controlIcon.classList.remove('fa-play');
};

//funcion para cambiar a la siguiente cancion
window.nextSong = function () {
  let currentAlbum = playList.albums[currentAlbumIndex];
  if (currentSongIndex + 1 < currentAlbum.songs.length) {
    // si hay mas canciones en el album actual
    currentSongIndex++;
  } else if (currentAlbumIndex + 1 < playList.albums.length) {
    // si hay mas albunes en la lista de reproducion
    currentAlbumIndex++;
    currentAlbum = playList.albums[currentAlbumIndex];
    currentSongIndex = 0; // reproduce la primera cancion del siguiente album
  } else {
    // si estamos en el ultimo album y ultima cancion, vuelve al inicio
    currentAlbumIndex = 0;
    currentAlbum = playList.albums[currentAlbumIndex];
    currentSongIndex = 0;
  }
  controlIcon.classList.remove('fa-pause');
  controlIcon.classList.add('fa-play');
  loadSong();
  playPause();
};

//funcion para cambiar a la anterior cancion
window.prevSong = function () {
  let currentAlbum = playList.albums[currentAlbumIndex];
  if (currentSongIndex > 0) {
    // si hay canciones anteriores en el album actual
    currentSongIndex--;
  } else if (currentAlbumIndex > 0) {
    // si hay albunes anteriores en la lista de reproduccion
    currentAlbumIndex--;
    currentAlbum = playList.albums[currentAlbumIndex];
    currentSongIndex = currentAlbum.songs.length - 1; // reproduce la ultima cancion del album
  } else {
    // si estamos en el primer album y primera cancion, vuelve al final
    currentAlbumIndex = playList.albums.length - 1;
    currentAlbum = playList.albums[currentAlbumIndex];
    currentSongIndex = currentAlbum.songs.length - 1;
  }
  controlIcon.classList.remove('fa-pause');
  controlIcon.classList.add('fa-play');
  loadSong();
  playPause();
};

//funcion para cargar la cancion actual al reproductor
window.loadSong = function () {
  let currentAlbum = playList.albums[currentAlbumIndex];

  if (currentAlbum && currentAlbum.songs && currentAlbum.songs.length > 0) {
    let currentSong = currentAlbum.songs[currentSongIndex];

    if (currentSong) {
      song.src = currentSong.src;

      // Actuliza el nombre y la caratula de la cancion
      title.textContent = currentSong.titleSong;
      album.textContent = currentAlbum.title;
      cover.src = currentAlbum.cover;
    } else {
      console.error('La cancion no esta definida.');
    }
  } else {
    console.error('El album o la lista de canciones no estan definidos');
  }
};

window.setupVolumeControl = function () {
  volumeSlider.addEventListener('input', function () {
    song.volume = volumeSlider.value / 100;

    updateVolumeIcon();
  });
};

function updateVolumeIcon() {
  if (volumeSlider.value == 0) {
    volumeIcon.classList.remove(
      'fa-volume-high',
      'fa-volume-off',
      'fa-volume-low'
    );
    volumeIcon.classList.add('fa-volume-xmark');
  } else if (volumeSlider.value < 25) {
    volumeIcon.classList.remove(
      'fa-volume-high',
      'fa-volume-xmark',
      'fa-volume-low'
    );
    volumeIcon.classList.add('fa-volume-off');
  } else if (volumeSlider.value <= 60) {
    volumeIcon.classList.remove(
      'fa-volume-off',
      'fa-volume-xmark',
      'fa-volume-high'
    );
    volumeIcon.classList.add('fa-volume-low');
  } else {
    volumeIcon.classList.remove(
      'fa-volume-off',
      'fa-volume-xmark',
      'fa-volume-low'
    );
    volumeIcon.classList.add('fa-volume-high');
  }
}

window.setInitialVolume = function (initialVolume) {
  volumeSlider.value = initialVolume;

  song.volume = initialVolume / 100;

  updateVolumeIcon();
};
