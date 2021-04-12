function getAllSongs() {
    return new Promise((resolve, reject) => {
        $.get('/api/get_all_songs').done((resp) => {
            if (resp.success) {
                resolve(resp.songs);
            } else {
                reject();
            }
        })
    })
}
