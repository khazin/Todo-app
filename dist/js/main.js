const checkboxAdd=document.querySelector("#checkboxAdd"),checkbox=document.querySelector(".checkbox__box");document.addEventListener("click",(c=>{let e=c.target;e.classList.contains("checkbox__box")&&(console.log(e),checkbox.classList.toggle("checked"))}));