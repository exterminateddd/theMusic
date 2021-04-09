function getSongData(hash) {
    return new Promise((resolve, reject) => {
        $.get('/api/get_song_data/'+hash).done((resp) => {
            if (resp.success) {
                resolve(resp.data);
            } else {
                reject();
            }
        })
    })
}
