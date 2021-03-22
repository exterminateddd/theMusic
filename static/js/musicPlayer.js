let audio = document.querySelector(".audio-player");
let isPlaying = false;
let isPlayerVisible = true;
let currentSong = null;
const soundVolume = document.getElementById("sound-volume");
const timeRange = document.getElementById("timeRange")
const playerBox = document.querySelector(".player-container")
const songInfoBlock = document.querySelector(".songInfoBlock")
const songName = document.getElementById("song-name")
const songAuthor = document.getElementById("song-author")

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
  document.querySelector(".b").innerHTML = `<img src="/static/assets/pause.svg" alt="">`;
  audio.volume = document.getElementById("volumeRange").value / 100;
}

function pause() {
  audio.pause();
  isPlaying = false;
  document.querySelector(".b").innerHTML = `<img src="/static/assets/play.svg" alt="">`;
  audio.volume = document.getElementById("volumeRange").value / 100;
}

function toggle() {
  isPlaying ? pause() : play()
}

document.querySelector(".b").addEventListener('click', () => {
    toggle();
});
document.getElementById("volumeRange").addEventListener("input", () => {
    audio.volume = document.getElementById("volumeRange").value / 100;
});
document.getElementById("timeRange").addEventListener("input", () => {
    audio.currentTime = audio.duration / 100 * document.getElementById("timeRange").value;
    // document.getElementById("timeRange").value = audio.currentTime / (audio.duration / 100)
    if (audio.currentTime > (audio.duration / 100 * 99)) {
      audio.currentTime = 0;
      pause();
    }
});
audio.ontimeupdate = function() {
    document.getElementById("timeRange").value = 100 / (audio.duration / audio.currentTime)
    if (audio.currentTime > (audio.duration / 100 * 99)) {
      audio.currentTime = 0;
      pause();
    }
};

const getSong = (hash) => {
    $.get("/get_song_data/" + hash)
            .done((resp) => {
                    if (!resp.success) {
                        Promise.reject("unsuccess").then(r => {})
                    } else {
                        console.log("successfully got song info")
                        return Promise.resolve({
                            "name": resp.info.name,
                            "author": resp.info.author
                        })
                    }
            })
}

function setCurrentSong(hash) {
    if (!hash) {return ""}
    audio.src = "/static/audio/"+hash+".mp3";
    timeRange.value = 0;
    $.get("/get_song_data/" + hash)
            .done(({success, info}) => {
                if (!success) {

                } else {
                    currentSong = hash;
                    setPlayerBarSongInfo(info.author, info.name);
                }
            })
}

function setPlayerBarSongInfo(author, name) {
    songAuthor.textContent = proccessSongParameter(author);
    songName.textContent = proccessSongParameter(name);
}