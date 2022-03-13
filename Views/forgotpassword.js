document.getElementById("sendreset").addEventListener("click",(e)=>{
    e.preventDefault()
    axios
    .post("http://localhost:3000/forgotpassword")
})