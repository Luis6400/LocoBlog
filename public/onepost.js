const titleinp = document.getElementById('titleinp');
const contentinp = document.getElementById('contentinp');
const updatebut = document.getElementById('updatebut');
const deletebut = document.getElementById('deletebut');
const butdata = updatebut.getAttribute('data');

updatebut.addEventListener('click', async () => {
    var passed = false;
    if (titleinp.value !== '') {
        
    
    await fetch('/api/editpost', {
        method: 'PUT',
        body: JSON.stringify({
            post_title: titleinp.value,
            postid: butdata,


        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        if (response.ok) {
            console.log('Success in updating post');
            passed = true;
        }
        else {
            console.log(response);
        }
    })
    
    .catch((error) => {
        console.error( error);
    }
    );}

    if (contentinp.value !== '') {
        await fetch('/api/editpost', {
            method: 'PUT',
            body: JSON.stringify({
                post_content: contentinp.value,
                postid: butdata,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (response.ok) {
                console.log('Success in updating post');
                passed = true;
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
    if (passed){
        window.location.reload();
    }
    

});

deletebut.addEventListener('click', async () => {
    await fetch('/api/deletepost', {
        method: 'DELETE',
        body: JSON.stringify({
            postid: butdata,
        }),
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

 