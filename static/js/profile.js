const profileName = window.location.toString().split("/")[window.location.toString().split("/").length-1]
console.log(profileName)

document.addEventListener('DOMContentLoaded', (e) => {
    $.get('/api/get_user_data/'+profileName).then(
        (resp) => {
            if (!resp.success) {

            } else {

            }
        }
    )
})
