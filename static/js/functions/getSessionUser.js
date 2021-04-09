function getSessionUser() {
    return new Promise((res, rej) => {
        $.get('/api/get_session_user')
            .done((resp)=> {
                if (resp.success) {
                    res(resp.username)
                } else {
                    rej()
                }
        });
    })
}