// class SongQueue {
//     constructor(player) {
//         this.songsArray = ["dqbYGx9tD4ne", "gb69kkGR44rU"];
//         this.currentSong = 0;
//         this.player = player;
//     }
//     addSong(hash) {
//         this.songsArray.push(hash);
//     }
//     setSongsArray(arr) {
//         this.songsArray = arr;
//     }
//     setSongIndex(index) {
//         this.currentSong = index;
//     }
//     nextSong() {
//         this.currentSong += 1;
//         this.refresh();
//     }
//     refresh() {
//         console.log(this.songsArray[this.currentSong])
//         this.player.setSong("test", "test1", this.songsArray[this.currentSong]);
//         this.player.play();
//     }
//     getCurrentSong() {
//         return this.songsArray[this.currentSong];
//     }
// }