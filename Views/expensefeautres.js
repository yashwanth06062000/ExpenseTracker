const expensecontainer=document.getElementById("expenses")


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
    const token=localStorage.getItem("token");
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
    const token=localStorage.getItem("token");
    if(e.target.className=="dltexp"){
        const dltexpense={
            id:e.target.id
        }
      axios
      .post("http://localhost:3000/deleteexpense",dltexpense,{headers:{"Authorization":token}}).then((e)=>{
        expensecontainer.innerHTML=""
        axios
        .get("http://localhost:3000/getexpenses",{headers:{"Authorization":token}})
        .then((expenses)=>{
            const UserExpenses=expenses.data.expenses;
            for(let i=0;i<UserExpenses.length;i++)
            {
                console.log("hie")
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
            
        })
        .catch(err=>console.log(err))



      }).catch(err=>console.log(err))
    }
})




// console.log("hie")
