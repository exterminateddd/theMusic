class SongLink {
    constructor(selector, song, player) {
        this.player = player;
        this.song = song;
        this.song.onPlayEnd = () => {
            this.setPlaying(false);
        }
        this.wrapper = document.querySelector(selector);
        this.wrapper.textContent = `
            play_circle_outline
        `
        this.isPlaying = false;
        this.wrapper.addEventListener('click', () => {
            if (this.player.currentSong.hash !== this.song.hash) {
                console.log("##3")
                this.player.setSong(this.song);
                this.player.play();
            } else {
                this.player.toggleState();
                this.toggleState()
            }
        })
    }
    toggleState() {
        this.setPlaying(!this.isPlaying)
    }
    setPlaying(bool_) {
        this.isPlaying = bool_;
        if (bool_) {
            this.wrapper.textContent = "pause_circle_outline";
        } else {
            this.wrapper.textContent = "play_circle_outline";
        }
    }
}