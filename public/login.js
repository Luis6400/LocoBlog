const usernameinput = document.getElementById('username');
const passwordinput = document.getElementById('password');
const loginbutton = document.getElementById('login');

loginbutton.addEventListener('click', async () => {
    if (!usernameinput.value || !passwordinput.value) {
        console.log('Please enter a username and password');
        return;
    }
    await fetch('/api/login', {
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
            console.log('Success in logging in');
            window.location.replace('/');
        }
        else {
            console.log(response);
        }
    })
    
    .catch((error) => {
        console.error( error);
    }
    );

}
);

