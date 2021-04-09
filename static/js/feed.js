const songsBlock = document.querySelector(".music-top-box")

let isMusicLoading = true;
let currentUser_;

function setCurrentUser() {
    getSessionUser()
        .then((username) => {
            getUserData(username)
                .then((data) => {
                    currentUser_ = data;
                    setUsernameLabel(data.name);
                })
        })
}

function titleCase(str) {
      str = str.toLowerCase().split(' ');
      for (let i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
      }
      return str.join(' ');
}

function proccessSongParameter(val) {
    return titleCase(val.replaceAll("-", " "))
}

function newSongPlayListenerCallback() {
    timeRange.value = 0;
    pause();
    if (!isPlayerVisible) {
        togglePlayerBoxVisibility();
    }
    setCurrentSong(this.parentNode.parentNode.dataset.songHash, ()=>{play()});
    setTimeout(()=>{}, 1000);
}

function generateSongElementHTML(hash, name, author) {
    return `
                    <div class="song" data-song-hash="${hash}">
                    <div class="song__left-side">
                        <h2 class="song-name">
                            ${proccessSongParameter(name)}
                        </h2>
                        <h4 class="song-author">
                            ${proccessSongParameter(author)}
                        </h4>
                    </div>
                    <div class="song__right-side">
                        <img src="/static/assets/play.svg" alt="Play this song" class="playRecSong">
                    </div>
                    </div>
                    `
}

const refreshSongs = (successCallback) => {
    getAllSongs().then(songs => {
        let songsContent = ``
        songs.forEach(song => {
            songsContent += generateSongElementHTML(song.hash, song.name, song.author);
        })
        songsBlock.innerHTML = songsContent;
        isMusicLoading = false;
        document.querySelectorAll(".playRecSong").forEach((elem) => {
            elem.addEventListener("click", newSongPlayListenerCallback)
        })
    })
}

document.addEventListener('DOMContentLoaded', (e) => {
    setCurrentUser();
    refreshSongs()
});

document.querySelector(".player-toggle-box").addEventListener("click", (e) => {
    togglePlayerBoxVisibility();
});

window.onbeforeunload = function () {
    localStorage.setItem('lastTime', audio.currentTime);
    localStorage.setItem('keepPlaying', isPlaying);
};
