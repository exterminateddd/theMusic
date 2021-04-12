class Player {
    constructor(containerSelector) {
        this.wrapper = document.querySelector(containerSelector)
        this.wrapper.innerHTML = `
            <audio src="" class="audio-player" autoplay="" preload="metadata"></audio>
            <div class="player-container">
                <button class="b">
                    <span class="material-icons">
                        play_circle_outline
                    </span>
                </button>
                <div class="middle-container">
                    <div class="songInfoBlock">
                        <h1 class="song-name">Song name</h1>
                        <h1 class="song-author">Song Author</h1>
                    </div>
                    <input type="range" min="0" max="100" value="0" class="timeSlider timeRange">
                </div>
                <div class="volume-slider-container">
                    <h6 id="sound-volume"></h6>
                    <p class="volumeLimit">
                        0
                    </p>
                    <input type="range" min="0" max="100" value="50" class="volumeSlider volumeRange">
                    <p class="volumeLimit">
                        100
                    </p>
                </div>
            </div>
            <div class="player-toggle-box">
                <img src="/static/assets/switch.svg" alt="">
            </div>
            `

            // elements

            this.container = this.wrapper.querySelector(".player-container");
            this.visToggleBtn = this.wrapper.querySelector(".player-toggle-box");
            this.stateToggleBtn = this.container.querySelector(".b");
            this.stateIndicator = this.stateToggleBtn.querySelector("span");
            this.audio = this.wrapper.querySelector("audio");
            this.infoBlock = this.container.querySelector(".middle-container").querySelector(".songInfoBlock");
            this.volumeLine = this.wrapper.querySelector(".volume-slider-container").querySelector("input");
            this.timeLine = this.infoBlock.parentNode.querySelector(".timeRange");
            this.authorLbl = this.infoBlock.querySelector(".song-author");
            this.nameLbl = this.infoBlock.querySelector(".song-name");

            // publics

            this.isPlaying = false;
            this.isVisible = true;
            this.currentSong;

            // listeners

            this.visToggleBtn.addEventListener('click', (e) => {
                this.toggleVis();
            })

            this.stateToggleBtn.addEventListener('click', (e) => {
                this.toggleState();
            })

            this.audio.ontimeupdate = () => {
                this.updateTime(this.audio.currentTime);
            }

            this.timeLine.addEventListener("input", (e) => {
                this.audio.currentTime = this.timeLine.value;
            })

            this.volumeLine.addEventListener("input", (e) => {
                this.audio.volume = this.volumeLine.value/100;
            })

            // other
            this.audio.volume = 0.5
    }

    setSong(name, author, hash) {
        this.currentSong = new Song(name, author, hash);
        this.audio.src = "/static/audio/"+hash+'.mp3';
        this.audio.onloadedmetadata = () => {
            this.timeLine.max = Math.floor(parseFloat(this.audio.duration));
        }
        this.pause()
        this.authorLbl.textContent = proccessSongParameter(author);
        this.nameLbl.textContent = proccessSongParameter(name);
    }

    show() {
        this.container.style.opacity = 1;
        this.isVisible = true;
        this.visToggleBtn.querySelector("img").style.transform = "rotateY(180deg)"
    }

    hide() {
        this.container.style.opacity = 0;
        this.isVisible = false;
        this.visToggleBtn.querySelector("img").style.transform = "rotateY(0deg)"
    }

    play() {
        if (this.currentSong) {
            this.audio.play();
            this.isPlaying = true;
            this.stateIndicator.textContent = "pause_circle_outline";
            if (this.audio.currentTime >= Math.floor(parseFloat(this.audio.duration))-1) {
                this.setTime(0);
                this.pause()
            }
        }
    }
    pause() {
        if (this.currentSong) {
            this.audio.pause();
            this.isPlaying = false;
            this.stateIndicator.textContent = "play_circle_outline";
        }
    }
    toggleState() {
        this.isPlaying ? this.pause() : this.play();
    }
    toggleVis() {
        this.isVisible ? this.hide() : this.show();
    }
    setTime(time) {
        this.audio.currentTime = time;
    }
    setVolume(volume) {
        this.audio.volume = volume>1 ? volume/100 : volume;
    }
    updateTime(time) {
        this.timeLine.value = time;
        if (time >= Math.floor(parseFloat(this.audio.duration))-1) {
            this.pause();
        }
    }
}