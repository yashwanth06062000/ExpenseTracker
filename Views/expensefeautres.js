

const expensecontainer=document.getElementById("expenses")
const leaderboard=document.getElementById("leaderboard")



const expenseform=document.getElementById("expenseform")

var token=localStorage.getItem("token");



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
        .post("http://localhost:3000/addexpense",expensedetails,{headers:{"Authorization":token}}).then(()=>{
            expensecontainer.innerHTML=""
            axios
            .get("http://localhost:3000/getexpenses",{headers:{"Authorization":token}})
            .then((expenses)=>{
                const UserExpenses=expenses.data.expenses;
                console.log("outerfor loop")
                for(let i=0;i<UserExpenses.length;i++)
                {
                  const expensediv=document.createElement("div")
                  expensediv.classList.add('expensediv')
                  expensediv.innerHTML=`
                  <span>.</span>
                  <span class="desc1">${UserExpenses[i].description}</span>
                  <span class="category">${UserExpenses[i].ctegory}</span>
                  <span class="money">${UserExpenses[i].money}</span>
                  <button type="submit" class="dltexp" id=${UserExpenses[i].id}>X</button>
                  `
        
                  expensecontainer.appendChild(expensediv)
                }
                document.getElementById("money").value="";
                document.getElementById("desc").value="";
                document.getElementById("category").value="";
        
            })
            .catch(err=>console.log(err))
            


        }).catch(err=>console.log(err))
        


    }
})

//getting all the expenses of user snad showing to user


window.addEventListener('DOMContentLoaded',(e)=>{
    is__premium()
   
    axios
    .get("http://localhost:3000/getexpenses",{headers:{"Authorization":token}})
    .then((expenses)=>{
        
        const UserExpenses=expenses.data.expenses;
        for(let i=0;i<UserExpenses.length;i++)
        {
          const expensediv=document.createElement("div")
          expensediv.classList.add('expensediv')
          expensediv.innerHTML=`
          <span>.</span>
          <span class="desc1"}>${UserExpenses[i].description}</span>
          <span class="category"id="category">${UserExpenses[i].ctegory}</span>
          <span class="money"id="money">${UserExpenses[i].money}</span>
          <button type="submit" class="dltexp" id=${UserExpenses[i].id}>X</button>
          `

          expensecontainer.appendChild(expensediv)
     }

    })
    .catch(err=>console.log(err))

} )

expensecontainer.addEventListener("click",(e)=>{
   
    if(e.target.className=="dltexp"){
        const dltId=e.target.id
        const dltexpense={
            id:e.target.id
        }
      axios
      .post("http://localhost:3000/deleteexpense",dltexpense,{headers:{"Authorization":token}}).then((e)=>{
        
          document.getElementById(dltId).parentElement.remove();
       }).catch(err=>console.log(err))
    }
})

const rzpbtn=document.getElementById('paymentbtn')

rzpbtn.addEventListener("click",async ()=>{
    const token=localStorage.getItem("token");
    let obj={
        id:"123"
    }
    await axios 
    .post('http://localhost:3000/buypremium',obj,{headers:{"Authorization":token}}).then((response)=>{


        var options = {
            "key": response.data.key_id,
            "name": "Test Company",
            "order_id": response.data.order.id, 
            "prefill": {
              "name": "Test User",
              "email": "test.user@example.com",
              "contact": "8555008111"
            },
            "theme": {
             "color": "#3399cc"
            },
            "handler": function (response){
                var token1=localStorage.getItem("token");
                axios
                .post('http://localhost:3000/updatetransactionstatus',{
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
         }, { headers: {"Authorization" : token1} }).then(() => {
             alert('You are a Premium User Now')
             window.location.replace('./expensefeautres.html')
         }).catch(() => {
             alert('Something went wrong. Try Again!!!')
         })
            },
        };
        var rzp1 = new Razorpay(options);
            rzp1.open();
            e.preventDefault();
        
        rzp1.on('payment.failed', function (response){
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
    });




    })

})
async function is__premium(){
    let obj={
        id:123
    }
    const token=localStorage.getItem("token");
   await axios
    .post("http://localhost:3000/is_premium",obj,{headers:{"Authorization":token}}).then((res)=>{
        // console.log(res.data.ispremium)
        if(res.data.ispremium){
            const body = document.body
            const i1=document.getElementById('expenseform')
            const i2=document.getElementById('expenses')
            body.classList.add('active')
            i1.classList.add('active1')
            i2.classList.add('active1')
            //adding leaderboard to the premium users
            axios
            .get("http://localhost:3000/leaderboard",{headers:{"Authorization":token}})
            .then((users)=>{
                // console.log(users.data.users)


                for(let i=0;i<users.data.users.length;i++)
                {
                  const expensediv=document.createElement("div")
                  expensediv.classList.add('expensediv')
                  expensediv.innerHTML=`
                  <span>${i+1}</span>
                  <span class="desc1"}>${users.data.users[i].username}</span>
                  <span class="category"id="category">${users.data.users[i].totalexpense}</span>
                  `
        
                  leaderboard.appendChild(expensediv)
             }})
            .catch(err=>console.log(err))

        }
    }).catch(err=>console.log(err))
    document.getElementById("paymentbtn").classList.add("hide")
  

}
const signout=document.getElementById('signout')
signout.addEventListener("click",()=>{
    window.location.replace('./Login.html')

})
const report=document.getElementById('reporte')
report.addEventListener("click",()=>{
    window.location.replace("./report.html")
   
})



