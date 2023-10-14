const prevBtn = document.querySelector(".prev_button__");
const playBtn = document.querySelector(".play_puse_button__");
const playBtnIcon = document.querySelector("#play_puse_icon__");
const nextBtn = document.querySelector(".next_button__");
const songName = document.querySelector(".playing_song_name__");
const artistName = document.querySelector(".playing_artist_name__");
const songCover = document.querySelector(".playing_cover_image__");
const progress = document.querySelector("#music_range_input");
const volumeProgress = document.querySelector(".volume_progress_input");
const volumeIcon = document.querySelector("#volume_icon");
const bodyBackgroundImg = document.querySelector("#body_background_img");
let current = 0;
let currentSong;


songs.forEach((song) => {
  song.ele.addEventListener("ended", () => {
    nextBtn.click();
  });
});


const updatePlayingSongInfo = function (current) {
  currentSong = songs[current].ele;
  songName.textContent = songs[current].audioName;
  artistName.textContent = songs[current].audioArtist;
  songCover.src = songs[current].audioCover;
  bodyBackgroundImg.src = songs[current].audioCover;
  
  songs.forEach((song)=> {
    song.played = false;
  })
  songs[current].played = true
};

updatePlayingSongInfo(current);

playBtn.addEventListener("click", () => {
  playPauseSong();
  console.log(songs)
});

nextBtn.addEventListener("click", () => {
  updateSong("next");
  playPauseSong();
  console.log(songs)
});

prevBtn.addEventListener("click", () => {
  updateSong("prev");
  playPauseSong();
  console.log(songs)
});

function musicProgressColor(ele) {
  let value = ((ele.value - ele.min) / (ele.max - ele.min)) * 100;
  ele.style.background = `linear-gradient(90deg, #000 ${value}%, #938F7E ${value}%)`;
}

const volumeProgressingToSongVolume = function(){
  currentSong.volume = parseFloat(volumeProgress.value / 100);
}

progress.addEventListener("input", function () {
  musicProgressColor(this);
});

volumeProgress.addEventListener("change", () => {
  volumeProgressingToSongVolume()
});


volumeIcon.addEventListener('click',()=>{
  if (volumeProgress.value == 0) {
    volumeProgress.value = 100;
  } else {
    volumeProgress.value = 0 ;
  }
  volumeProgressingToSongVolume()
  musicProgressColor(volumeProgress);
  changeVolumeIcon()
})

volumeProgress.addEventListener("input", function () {
  musicProgressColor(volumeProgress);
  changeVolumeIcon()
});

const changeVolumeIcon = function() {
  if(volumeProgress.value >= 50) {
    volumeIcon.className = "las la-volume-up";
  } else if (volumeProgress.value >= 1){
    volumeIcon.className = "las la-volume-down";
  } else {
    volumeIcon.className = "las la-volume-mute"
  }
}

musicProgressColor(volumeProgress);

currentSong.onloadedmetadata = function () {
  progress.max = currentSong.duration;
  progress.value = currentSong.currentTime;
};

if (playBtnIcon.classList.contains("fa-play")) {
  setInterval(() => {
    progress.value = currentSong.currentTime;
    musicProgressColor(progress);
  }, 500);
}

progress.addEventListener("change", () => {
  currentSong.currentTime = progress.value;
});

const updateSong = (action) => {
  currentSong.pause();
  currentSong.currentTime = 0;

  if (action === "next") {
    current++;
    if (current > songs.length - 1) current = 0;
  } else if (action === "prev") {
    current--;
    if (current < 0) current = songs.length - 1;
  }
  updatePlayingSongInfo(current);
};

const playPauseSong = () => {
  if (currentSong.paused) {
    currentSong.play();
    playBtnIcon.className = "fa-solid fa-pause";
  } else {
    currentSong.pause();
    playBtnIcon.className = "fa-solid fa-play";
  }
};