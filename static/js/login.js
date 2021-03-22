const siFormName = document.querySelector("#name")
        const siFormPW = document.querySelector("#password")
        document.querySelector('#login').addEventListener('click', (e) => {
            $.post('/api/login', JSON.stringify({
                'name': siFormName.value,
                'pw': siFormPW.value
            })).done((resp) => {
                let notify_lvl
                if (resp.success) {notify_lvl = "success"} else {notify_lvl = "error"}
                $.notify(resp['msg'], notify_lvl);
                if (resp.success) {window.location = window.location.origin+"/feed"}
            })
        })