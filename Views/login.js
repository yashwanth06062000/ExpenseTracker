const form=document.getElementById('Signupdiv')
form.addEventListener('click',(e)=>{
    if(e.target.className=="signupbutton"){
        const name=document.getElementById("name").value
        const email=document.getElementById("email").value
        const phone=document.getElementById("phone").value
        const password=document.getElementById("password").value
        e.preventDefault();
        const obj={
            name:name,
            email:email,
            phone:phone,
            password:password
        }
        axios
        .post("http://localhost:3000/signup",obj)
        .then((res)=>{
            console.log(res)})
        .catch(err=>console.log(err))    
    
    }
    if(e.target.className=="loginbutton"){
        const email=document.getElementById("email").value
        const password=document.getElementById("password").value
        e.preventDefault();
        const obj={
            email:email,
            password:password
        }
        axios
        .post("http://localhost:3000/login",obj)
        .then((res)=>{
            console.log(res)})
        .catch(err=>console.log(err))    
    
    }

})