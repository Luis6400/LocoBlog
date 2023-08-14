const titleinp = document.getElementById('title');
const contentinp = document.getElementById('content');
const postbutton = document.getElementById('postbut');

postbutton.addEventListener('click', async () => {
    if (!titleinp.value || !contentinp.value) {
        console.log('Please enter a title and content');
        return;
    }
    await fetch('/api/newpost', {
        method: 'POST',
        body: JSON.stringify({
            post_title: titleinp.value,
            post_content: contentinp.value,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        if (response.ok) {
            console.log('Success in posting');
        }
        else {
            console.log(response);
        }
    })
    
    .catch((error) => {
        console.error( error);
    }
    );
    window.location.replace('/');


});