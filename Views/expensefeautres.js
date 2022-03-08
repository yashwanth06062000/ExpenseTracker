const expenseform=document.getElementById("expenseform")



expenseform.addEventListener("click",(e)=>{
    e.preventDefault();
    if(e.target.className=="submit"){

        const money=document.getElementById("money").value;
        const description=document.getElementById("desc").value;
        const category=document.getElementById("category").value;
        const token=localStorage.getItem("token");
        
        const expensedetails={
            money:money,
            description:description,
            category:category
        }
        axios
        .post("http://localhost:3000/addexpense",expensedetails,{headers:{"Authorization":token}})
        


    }
})