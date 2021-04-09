const regFormName = document.querySelector("#name")
const regFormPW = document.querySelector("#password")
document.querySelector('#reg').addEventListener('click', (e) => {
    $.post('/api/reg', JSON.stringify({
        'name': regFormName.value,
        'pw': regFormPW.value
    })).done(({msg, success}) => {
        if (success) {$.notify(msg, "success");} else {$.notify(msg, "error"); return}
        window.location = window.location.origin+"/feed"
    })
})