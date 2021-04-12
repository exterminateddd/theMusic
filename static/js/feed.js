const songsBlock = document.querySelector(".music-top-box")
const logoutBtn = document.querySelector("#logout")

let isMusicLoading = true;
let currentUser_;

let player = new Player('.player-bottom');

if (localStorage.getItem('lastSong')) {
    getSongData(localStorage.getItem('lastSong'))
        .then((data) => {
            player.show();
            player.setSong(data.name, data.author, data.hash);
            player.setTime(localStorage.getItem('lastTime'));
        })
        .catch((err) => {
            $.notify("Failed to get last song data.", "error");
        })
}

logoutBtn.addEventListener('click', (e) => {
    logOut()
        .then((resp) => {
            window.location = window.location.origin + '/login'
        })
        .catch((err) => {
            $.notify("Failed to log out!", "error")
        })
})

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
    player.show();
    getSongData(Object.assign({}, this.parentNode.parentNode.parentNode.dataset).songHash)
        .then((data) => {
            player.setSong(data.name, data.author, data.hash);
            player.play();
        })
        .catch((err) => {
            $.notify("Failed to load song data!", "error");
        })
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
                        <div class="rec-song-info">
                        <img src="/static/assets/play.svg" alt="Play this song" class="playRecSong">
                        </div>
                        
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
    refreshSongs();
});

window.onbeforeunload = function() {
    localStorage.setItem('lastTime', player.audio.currentTime);
    localStorage.setItem('lastSong', player.currentSong.hash);
};