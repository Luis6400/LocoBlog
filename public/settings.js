const userinp = document.getElementById('username');
const passinp = document.getElementById('password');
const updatebut = document.getElementById('updatebut');

updatebut.addEventListener('click', async () => {
    var passed = false;
    if (userinp.value !== '') {
        await fetch('/api/edituser', {
            method: 'PUT',
            body: JSON.stringify({
                username: userinp.value,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Success in updating username');
                    passed = true;
                }
                else {
                    console.log(response);
                }
            })

            .catch((error) => {
                console.error(error);
            }
            );
    }
    if (passinp.value !== '') {
        await fetch('/api/edituser', {
            method: 'PUT',
            body: JSON.stringify({
                password: passinp.value,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Success in updating password');
                    passed = true;
                }
                else {
                    console.log(response);
                }
            })

            .catch((error) => {
                console.error(error);
            }
            );
    }

    if (passed){

        window.location.replace('/dashboard');
    }

}
);