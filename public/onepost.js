const titleinp = document.getElementById('titleinp');
const contentinp = document.getElementById('contentinp');
const updatebut = document.getElementById('updatebut');
const deletebut = document.getElementById('deletebut');
const butdata = updatebut.getAttribute('data');

updatebut.addEventListener('click', async () => {
    if (!titleinp.value && !contentinp.value) {
        console.log('Please enter a title and content');
        return;
    }
    await fetch('/api/editpost', {
        method: 'PUT',
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
            console.log('Success in updating post');
            window.location.reload();
        }
        else {
            console.log(response);
        }
    })
    
    .catch((error) => {
        console.error( error);
    }
    );
    

});

deletebut.addEventListener('click', async () => {
    await fetch('/api/deletepost', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        if (response.ok) {
            console.log('Success in deleting post');
        }
        else {
            console.log(response);
        }
    })
    
    .catch((error) => {
        console.error( error);
    }
    );
    window.location.replace('/dashboard');

}
);