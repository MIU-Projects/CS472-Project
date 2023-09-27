window.onload = function (){
    document.getElementById("login-btn").onclick = function(event){
        event.preventDefault();
        login();
    }
}

function login(){
    const userName = document.getElementById('userName').value;
    const password = document.getElementById('password').value;
    fetch("http://localhost:5001/users/login?userName="+userName+"&password="+password ,{
        method : "GET", 
        headers: {
            'Content-type': 'application/json',
        }  
    }).then(res =>{
        if (res.status === 404) {
            throw new Error("User Not Found");
        }
        return res.json();
    }).then(data => {
        sessionStorage.setItem("User-Data",data)
        window.location.href = '\home';
       
    }) ;

}