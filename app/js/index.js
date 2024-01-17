let progress = document.getElementById('progress');
let song = document.getElementById('song');
let controlIcon = document.getElementById('ctrIcon');

song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
};

function playPause() {
  if (controlIcon.classList.contains('fa-pause')) {
    song.pause();
    controlIcon.classList.remove('fa-pause');
    controlIcon.classList.add('fa-play');
  } else {
    song.play();
    controlIcon.classList.remove('fa-play');
    controlIcon.classList.add('fa-pause');
  }
}

// arreglar esto:
if (song.play()) {
  setInterval(() => {
    progress.value = song.currentTime;
  }, 500);
}

progress.onchange = function () {
  song.play();
  song.currentTime = progress.value;
  controlIcon.classList.add('fa-pause');
  controlIcon.classList.remove('fa-play');
};

// usar api para obtener datos y las canciones pueden ser locales :)
song.addEventListener('loadedmetadata', function () {
  console.log('Name song: ', song.title);
  console.log('Song duration: ', song.duration, 'seconds');
  console.log('Album: ', song.album);
  console.log('Gender: ', song.genre);
  console.log('Year: ', song.year);
});

// console.log('metadata', song.onloadedmetadata);
