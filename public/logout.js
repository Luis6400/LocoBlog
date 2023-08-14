const logoutbutton = document.getElementById('logout');
logoutbutton.addEventListener('click', async () => {
    await fetch('/api/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        if (response.ok) {
            console.log('Success in logging out');
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