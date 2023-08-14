const usernameinp = document.getElementById('username');
const passwordinp = document.getElementById('password');
const signupbutton = document.getElementById('signupbut');

signupbutton.addEventListener('click', async () => {
    await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({
            username: usernameinput.value,
            password: passwordinput.value,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            if (response.ok) {
                console.log('Success in signing up');
                
            }
            else {
                console.log(response);
            }
        }
        )
        .catch((error) => {
            console.error(error);
        }
        );
        window.location.replace('/');

}
);
