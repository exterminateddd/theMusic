class Song {
    constructor(name, author, hash) {
        this.name = name;
        this.author = author;
        this.hash = hash;
        this.onPlayEnd = () => {};
    }
}