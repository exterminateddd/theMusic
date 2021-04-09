function getUserData(username) {
    return new Promise((res, rej) => {
        $.get('/api/get_user_data/'+username)
            .then((resp) => {
                if (!resp.success) {
                    res(resp.data)
                } else {
                    rej()
                }
                
            })
    })
}