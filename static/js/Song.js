class Song {
    constructor(hash) {
        console.log("new song!")
        this.hash = hash;
        return new Promise((resolve, reject) => {
            this.updateSongInfo().done((data) => {
                this.name = data.name;
                this.author = data.author
                resolve("finished")
            })
        })
    }

    updateSongInfo() {
        $.get("/get_song_data/" + this.hash)
            .done((resp) => {
                if (!resp.success) {
                } else {
                    return new Promise((resolve, reject) => {
                        resolve({
                            "name": resp.info.name,
                            "author": resp.info.author
                        })
                    })
                }
            })
        }
}