const siFormName = document.querySelector("#name")
const siFormPW = document.querySelector("#password")
document.querySelector('#login').addEventListener('click', (e) => {
    $.post('/api/login', JSON.stringify({
        'name': siFormName.value,
        'pw': siFormPW.value
    })).done(({msg, success}) => {
        if (success) {$.notify(msg, "success");} else {$.notify(msg, "error"); return}
        window.location = window.location.origin+"/feed"
    })
})