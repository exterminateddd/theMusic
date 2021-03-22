const regFormName = document.querySelector("#name")
        const regFormPW = document.querySelector("#password")
        document.querySelector('#reg').addEventListener('click', (e) => {
            $.post('/api/reg', JSON.stringify({
                'name': regFormName.value,
                'pw': regFormPW.value
            })).done((resp) => {
                let notify_lvl;
                if (resp.success) {notify_lvl = "success"} else {notify_lvl = "error"}
                $.notify(resp['msg'], notify_lvl);
                if (resp.success) {window.location = window.location.origin+"/feed"}
            })
        })