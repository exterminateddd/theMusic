let audio = document.querySelector(".audio-player");
let isPlaying = false;
let isPlayerVisible = false;
let currentSong = null;
const soundVolume = document.getElementById("sound-volume")
const timeRange = document.getElementById("timeRange")
const volumeRange = document.getElementById("volumeRange")
const playerBox = document.querySelector(".player-container")
const songInfoBlock = document.querySelector(".songInfoBlock")
const songName = document.getElementById("song-name")
const songAuthor = document.getElementById("song-author")
const playBtn = document.querySelector(".b")

if (getCookie('last_song')) {
    setCurrentSong(getCookie('last_song'), () => {
        togglePlayerBoxVisibility()
    });
}

function togglePlayerBoxVisibility() {
    if (isPlayerVisible) {
        playerBox.style.opacity = "0";
        isPlayerVisible = false;
    } else {
        if (currentSong) {
            playerBox.style.opacity = "1";
            isPlayerVisible = true;
        }
    }
}

function play() {
  audio.play();
  isPlaying = true;
  playBtn.innerHTML = `<img src="/static/assets/pause.svg" alt="">`;
  audio.volume = volumeRange.value / 100;
}

function pause() {
  audio.pause();
  isPlaying = false;
  playBtn.innerHTML = `<img src="/static/assets/play.svg" alt="">`;
  audio.volume = volumeRange.value / 100;
}

function toggle() {
  isPlaying ? pause() : play()
}

playBtn.addEventListener('click', () => {
    toggle();
});
volumeRange.addEventListener("input", () => {
    audio.volume = volumeRange.value / 100;
});
timeRange.addEventListener("input", () => {
    audio.currentTime = audio.duration / 100 * timeRange.value;
    if (audio.currentTime > (audio.duration / 100 * 99)) {
      audio.currentTime = 0;
      pause();
    }
});
audio.ontimeupdate = function() {
    timeRange.value = 100 / (audio.duration / audio.currentTime)
    if (audio.currentTime > (audio.duration / 100 * 99)) {
      audio.currentTime = 0;
      pause();
    }
};

function setCurrentSong(hash, successCallback) {
    if (!hash) {return ""}
    audio.src = "/static/audio/"+hash+".mp3";
    timeRange.value = 0;
    $.get("/api/get_song_data/" + hash)
            .done(({success, info}) => {
                if (!success) {

                } else {
                    currentSong = hash;
                    setPlayerBarSongInfo(info.author, info.name);
                    document.cookie = "last_song="+hash;
                    successCallback();
                }
            })
}

function setPlayerBarSongInfo(author, name) {
    songAuthor.textContent = proccessSongParameter(author);
    songName.textContent = proccessSongParameter(name);
}