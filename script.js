//! GET Method
function getPost(){
    document.getElementById('DivOfCreate').style.display = 'none'
    document.getElementById('DivOfEdit').style.display = 'none'

    let tbody = document.getElementById("tbody")
    
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(data=> data.json())
        .then(data=>{
            tbody.innerHTML='';

            data.map((value)=>{
                let row = document.createElement("tr")
                row.innerHTML = `
                    <td>${value.userId}</td>
                    <td>${value.id}</td>
                    <td>${value.title}</td>
                    <td>${value.body}</td>
                    <td>
                        <button onclick="EditPost(${value.id})">Edit</button>
                    </td>
                    <td>
                        <button onclick="DeletePost(${value.id})">Delete</button>
                    </td>
                `;
                tbody.append(row)
            })
        })
}

getPost()

//! create(POST METHOD)
let createPostForm = document.getElementById("create-post-form")
createPostForm.addEventListener('submit', createPost)

async function createPost(){
    event.preventDefault()
    
    let userIdDropdown = document.getElementById('userIDDropDown')
    let postTitle = document.getElementById('PostTitle')
    let postBody = document.getElementById('PostBody')

    let newPost = {
        userId : userIdDropdown.value,
        title: postTitle.value,
        body:postBody.value,
    }

    //post in api

    try{
        let postedJSON = await fetch('https://jsonplaceholder.typicode.com/posts',{
            method: 'POST',
            body: JSON.stringify(newPost),
            headers:{'Content-type': 'application/json; charset=UTF-8'}
        })
            .then(response => response.json())
            .then(response=> {
                console.log(response)
                resetInputValue()
            })
    }catch(error){
        console.log(error)
    }
}

//!PUT METHOD
let editPostForm = document.getElementById('edit-post-form')
editPostForm.addEventListener('submit',editPostForm.addEventListener('submit', UpdatePost))

function EditPost(PostId){
    document.getElementById('DivOfEdit').style.display = "block"

    // Get the content from the Post for Updating
    fetch(`https://jsonplaceholder.typicode.com/posts/${PostId}`)
        .then(data=> data.json())
        .then(data=> {
            let userId = document.getElementById('editUserId')
            let Title = document.getElementById('editPostTitle')
            let Body = document.getElementById('editPostBody')
            let post = document.getElementById('editPostId')

            userId.value = data.userId;
            Title.value = data.title;
            Body.value = data.body;
            post.value = data.id

            userId.setAttribute('disabled', 'true');
            post.setAttribute('disabled', 'true')
        })
}

function UpdatePost(){
    // console.log(PostIds)
    event.preventDefault()
    
    let userId = document.getElementById('editUserId')
    let Title = document.getElementById('editPostTitle')
    let Body = document.getElementById('editPostBody')
    let post = document.getElementById('editPostId')

    let UpdatedPost = {
        userId : userId.value,
        id: post.value,
        title: Title.value,
        body:Body.value,
    }
        let UpdatedPostJSON = fetch(`https://jsonplaceholder.typicode.com/posts/${post.value}`,{
            method: 'PUT',
            body: JSON.stringify(UpdatedPost),
            headers:{'Content-type': 'application/json; charset=UTF-8'}
        })
            .then(response => response.json())
            .then(response=> {
                console.log(response)
                resetInputValue()
            })
}



//!RESET INPUT VALUE
function resetInputValue(){
    let userIdDropdown = document.getElementById('userIDDropDown')
    let postTitle = document.getElementById('PostTitle')
    let postBody = document.getElementById('PostBody')

    userIdDropdown.value = '';
    postTitle.value = '';
    postBody.value = '';
}


//! Hide edit post form when Creating new POST.
let NavigateCreateForm = document.getElementById('Navigate-Create-Post-Page')

NavigateCreateForm.addEventListener('click',()=>{
    document.getElementById('DivOfEdit').style.display = 'none'
    document.getElementById('DivOfCreate').style.display = 'block'
})

//! Delete Method

function DeletePost(id){
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'DELETE',
    })
        .then(()=>{
            console.log(`ID: ${id} Item Deleted`);
        })
}