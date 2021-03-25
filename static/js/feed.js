const songsBlock = document.querySelector(".music-top-box")

let isMusicLoading = true;
let currentUser_;

const setUsernameLabel = () =>  {
    $.get('/api/get_session_user').done((resp)=> {
        if (!resp.success) {window.location=window.location.origin+"/signin"; console.log(resp.error)} else {
            currentUser_ = resp.user;
            document.querySelector("#username").textContent = currentUser_;
        }
    });
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
    setCurrentSong(this.dataset.songHash);
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
    $.get('/api/get_all_songs').done((resp) => {
        if (!resp.success) {} else {
            let songsContent = ``
            resp['songs'].forEach(song => {
                songsContent += generateSongElementHTML(song.hash, song.name, song.author);
            })
            songsBlock.innerHTML = songsContent;

            let songs = document.querySelectorAll(".song")

            for (let i = 0; i < songs.length; i++) {
                console.log(songs[i])
                songs[i].addEventListener('click', newSongPlayListenerCallback, false);
            }
            isMusicLoading = false;
        }
    })
}

document.addEventListener('DOMContentLoaded', (e) => {
    setUsernameLabel();
    setCurrentSong();
});

let currentUser = () => {
    $.get(`/get_user_info/${currentUser_}`).done((resp) => {
        if (resp.success) {
            return resp.user_obj;
        } else {
            $.notify("Error getting user info", "error");
        }
    });
};

document.querySelector(".player-toggle-box").addEventListener("click", (e) => {
    togglePlayerBoxVisibility();
})
