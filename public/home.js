const combut = document.querySelectorAll('.combut');
combut.forEach(but => {
    

but.addEventListener('click', async () => {
    
const cominput = document.getElementById(but.getAttribute('data'));
    if (cominput.value !== '') {
        await fetch('/api/newcomment', {
            method: 'POST',
            body: JSON.stringify({
                comment_text: cominput.value,
                postid: but.getAttribute('data'),
                comment_userid: but.getAttribute('data-user')
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.errors) {
                    console.log('Error in posting comment:', data.errors);
                    return;
                }
                console.log('Success in posting comment:', data);
                location.reload();
            }
            )
            .catch((error) => {
                console.error(error);
            }
            );

    }else
    {
        alert('Please enter a comment');
        return;
    }
}
);
});

function clickpost(postid) {
    window.location.replace(`/post/${postid}`);
}











