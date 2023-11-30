
let actualUser=sessionStorage.getItem("loggedUser");

function getUserInfo(actualUser){
    let xhr= new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/users/'+ actualUser);
    xhr.send();
    xhr.onload= function(){
        if(xhr.status==404){
            alert('usuario no encontrado')
        }
        if(xhr.status!=200){
            alert(xhr.status+ ': '+ xhr.statusText);
        }
        else{
            let user=JSON.parse(xhr.responseText);
            console.log(user._id);
            sessionStorage.setItem("idUser", user._id);
            setInfo(user);
            
        }
    };
}
function setInfo(user){
    document.getElementById("loggedUsername").innerHTML = user.username;
    document.getElementById('username').value=user.username;
    document.getElementById('useremail').value=user.email;
    switch(user.image){
        case 0:
            document.getElementById('imageUser').src="https://i.ibb.co/Svmsj4s/avatar.png";break;
        case 1:
            document.getElementById('imageUser').src="https://i.ibb.co/C96nqgj/Captura-de-pantalla-2023-11-25-225307.png";break;
        case 2:
            document.getElementById('imageUser').src="https://i.ibb.co/XV8LJCp/Captura-de-pantalla-2023-11-25-225127.png" ;break;
        case 3:
            document.getElementById('imageUser').src="https://i.ibb.co/3rKtNXy/download-1.jpg";break;

    }
    
    if(user.scores.easy.length<=3){
        let easy= document.getElementById("userScoreEasy").innerHTML='';
        let score=user.scores.easy;
        score.sort()
        for(let i=0; i< score.length; i++){
            let scoreText = document.createTextNode(score[i].score);
            easy.innerHTML=document.createElement("li").appendChild(scoreText);
        }
    }
    else{

    }
    if(user.scores.normal.length<=3){
        let easy= document.getElementById("userScoreNormal").innerHTML='';
        let score=user.scores.normal;
        score.sort()
        for(let i=0; i< score.length; i++){
            let scoreText = document.createTextNode(score[i].score);
            easy.innerHTML=document.createElement("li").appendChild(scoreText);
        }
    }else{

    }
    if(user.scores.hard.length<=3){
        let easy= document.getElementById("userScoreHard").innerHTML='';
        let score=user.scores.hard;
        score.sort()
        for(let i=0; i< score.length; i++){
            let scoreText = document.createTextNode(score[i].score);
            easy.innerHTML=document.createElement("li").appendChild(scoreText);
        }
    }
    else{

    }



}
function saveImage(){
    let image_options = document.getElementsByName("image_options");
    let image;
    for (let i = 0; i < image_options.length; i++) {
        if (image_options[i].checked)
            image= image_options[i].value;
    }
    let newImage={
        "id": sessionStorage.getItem("idUser"),
        "image":image

    }
    let xhr = new XMLHttpRequest();
    xhr.open("PUT", "http://localhost:3000/users");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(newImage));
    xhr.onload = () => {
        if (xhr.status != 200)
            alert(xhr.responseText);
        else {
            getUserInfo(actualUser);
        }
    }

}

function changeUserInfo(){
    let inputName=document.getElementById('username');
    inputName.removeAttribute('disabled');
    inputName.onclick=()=>{
        inputName.placeholder=""
    }
    let inputEmail=document.getElementById('useremail')
    inputEmail.removeAttribute('disabled');
    inputEmail.onclick=()=>{
        inputName.placeholder=""
    }
    let editButton=document.getElementById('editUser');
    editButton.style.display='none';
    let ok=document.createElement("button");
    ok.id="ok";
    ok.classList.add("btn");
    ok.classList.add("mx-2");
    ok.innerHTML='<i class="fa-solid fa-check" style="color: #ffffff;"></i>';
    ok.type="button";
    ok.onclick=saveUserSettings;
    ok.style="background-color: #8dbc84; color:#f1f1f1; border: none; border-radius: 5px; margin-left: 20%;";
    let cancel=document.createElement("button");
    cancel.id="cancel";
    cancel.classList.add("btn");
    cancel.innerHTML='<i class="fa-solid fa-xmark" style="color: #ffffff;"></i>';
    cancel.type="button";
    cancel.onclick=cancelUserSettings;
    cancel.style="background-color: #e47e88; color:#f1f1f1; border: none; border-radius: 5px; margin";
    editButton.parentElement.appendChild(ok);
    editButton.parentElement.appendChild(cancel);

}

function saveUserSettings(){
    sessionStorage.setItem("loggedUser", document.getElementById('username').value);
    let inputName=document.getElementById('username');
    let inputEmail=document.getElementById('useremail')

    let put={
        "id": sessionStorage.getItem("idUser"),
        "username":inputName.value,
        "email":inputEmail.value
    }
    let xhr = new XMLHttpRequest();
    xhr.open("PUT", "http://localhost:3000/users");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(put));
    xhr.onload = () => {
        if (xhr.status != 200)
            alert(xhr.responseText);
        else {
            document.getElementById("ok").remove();
            document.getElementById("cancel").remove();
            let editButton=document.getElementById('editUser');
            inputName.setAttribute("disabled", "")
            inputEmail.setAttribute('disabled', "");
            editButton.style.display='block';
            actualUser=sessionStorage.getItem("loggedUser");
            getUserInfo(actualUser);
        }
    }
}
function cancelUserSettings(){
    let inputName=document.getElementById('username');
    inputName.setAttribute("disabled", "")
    let inputEmail=document.getElementById('useremail')
    inputEmail.setAttribute('disabled', "");
    document.getElementById("ok").remove();
    document.getElementById("cancel").remove();
    let editButton=document.getElementById('editUser');
    editButton.style.display='block';
    getUserInfo(actualUser);
}
function borrarCuenta(){
    let userDelete={
        "id": sessionStorage.getItem("idUser"),
    }
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://localhost:3000/users");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(userDelete));
    xhr.onload = () => {
        if (xhr.status != 200)
            alert(xhr.responseText);
        else {
            logout();
        }
    }

}

function Loading(){
    let Loading=document.getElementById("loadingDiv")
    
    setTimeout(()=>{
        Loading.style.display="none";
        
    }, 3000)
}

function logout() {
    sessionStorage.setItem("loggedUser", "");
    window.location.href = "./minas.html";
}

Loading();
getUserInfo(actualUser);

