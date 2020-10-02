const img = document.querySelector("img");
const music = document.querySelector("audio");
const play = document.getElementById("play");
const artist = document.getElementById("artist");
const title = document.getElementById("title");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let progress = document.getElementById("progress");
let tot_duration = document.getElementById("duration");
let current_time = document.getElementById("current_time");
const progress_div = document.getElementById("progress_div");

const songs = [
  {
    name: "pm_1",
    title: "Dj-Remix",
    artist: "PM Dj",
  },
  {
    name: "pm_2",
    title: "Kuda Jane",
    artist: "KK,Shilpa Rao",
  },
  {
    name: "pm_3",
    title: "The Classic Arjit Sing Mashup",
    artist: "Dj Kiran Kamath",
  },
  {
    name: "pm_4",
    title: "Main Agar",
    artist: "Arjit Singh",
  },
  {
    name: "pm_5",
    title: "Danza Kuduro",
    artist: "Lucenzo",
  },
  {
    name: "pm_6",
    title: "Ae Dil Hai Mushkil",
    artist: "Sanam",
  },
  {
    name: "pm_7",
    title: "Ek Pyar Ka Nagma",
    artist: "Arijit Singh",
  },
  {
    name: "pm_8",
    title: "Tere Sath Tu",
    artist: "Jubin Nautiyal",
  },
  {
    name: "pm_9",
    title: "Tere Bin Ho Na Sakega Gujara",
    artist: "K.K",
  },
  {
    name: "pm_10",
    title: "Lambiyaan Si Judaiyaan",
    artist: "Arijit Singh,Shadab",
  },
  {
    name: "pm_11",
    title: "Main Tera Boyfriend",
    artist: "Arijit Singh,Neha kakkar",
  },
];

let isPlaying = false;

const playMusic = () => {
  isPlaying = true;
  music.play();
  play.classList.replace("fa-play", "fa-pause");
  img.classList.add("anime");
};

const pauseMusic = () => {
  isPlaying = false;
  music.pause();
  play.classList.replace("fa-pause", "fa-play");
  img.classList.remove("anime");
};

play.addEventListener("click", () => {
  isPlaying ? pauseMusic() : playMusic();
});

const loadSong = (songs) => {
  title.textContent = songs.title;
  artist.textContent = songs.artist;
  music.src = "music/" + songs.name + ".mp3";
  img.src = "images/" + songs.name + ".jpg";
};

songIndex = 0;
//   loadSong(songs[3]);

const nextSong = () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex])
  playMusic();
}
const prevSong = () => {
  {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex])
    playMusic();
  }
}

// Progress js work
music.addEventListener('timeupdate', (event) => {
  const { currentTime, duration } = event.srcElement;
  let progressTime = (currentTime / duration) * 100;
  progress.style.width = `${progressTime}%`;


  // music_duration_update 
  let min_duration = Math.floor(duration / 60);
  let sec_duration = Math.floor(duration % 60);

  let total_duration = `${min_duration}:${sec_duration}`;
  if (duration) {
    tot_duration.textContent = `${total_duration}`;
  }


  // music_current_update 
  let min_currentTime = Math.floor(currentTime / 60);
  let sec_currentTime = Math.floor(currentTime % 60);

  if (sec_currentTime < 10) {
    sec_currentTime = `0${sec_currentTime}`;
  }
  let total_currentTime = `${min_currentTime}:${sec_currentTime}`;
  current_time.textContent = `${total_currentTime}`;

});

// progress onCLick functionality

progress_div.addEventListener('click', (event) => {
  const { duration } = music;
  let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
  music.currentTime = move_progress;
})


// if music end than call new song
music.addEventListener('ended', nextSong);

next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);
