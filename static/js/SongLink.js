class SongLink {
    constructor(selector, song) {
        this.song = song;
        this.wrapper = document.querySelector(selector);
        this.wrapper.innerHTML = `
        
        `
    }
}