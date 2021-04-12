function logOut() {
    $.get('/api/logout')
        .then(({success}) => {
            if (!success) {

            } else {
                localStorage.removeItem('lastSong');
                window.location = window.location.origin+"/signin";
            }
        })
}