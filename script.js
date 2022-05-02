// create system services Object  
function Service (s_name ,s_price,s_PriceID,s_TaskID )
{
   this.serviceName = s_name ; 
   this.priceID = s_PriceID;
   this.taskID =s_TaskID ;
   let price = s_price;
   this.totalPrice = 0 ;
   this.getPrice = function()
   {
      return price;
   }
   
}
// create service instances 
let washCar = new Service("Wash Car" ,10,"wash-id",'wash-task'); 
let mowLawn = new Service("Mow Lawn" , 20 ,"mow-id",'mow-task') ; 
let pullWeeds = new Service("Pull Weeds" , 30 , "pull-id",'pull-task') ; 


// create customer Object
function Customer (mail,custServices , Cost)
{
   this.email = mail ,
   this.custServices = custServices;
   this.totalCost = Cost;
}

// create customer services array
let customerServices = []; 
// initalize total with 0
let totalCostP = document.getElementById("total-cost");
totalCostP.textContent += 0 ;

// add service by the first button
let taskContainer = document.getElementById('task-container');
let priceContainer = document.getElementById('price-container')
let height = 9 ;
let numOfItems = 0;

function render(service , clickFlag)
{
   if(clickFlag){
         taskContainer.innerHTML += `<p class='tasks' id='${service.taskID}'>${service.serviceName}
         <a href='#' onclick="remove('${service.serviceName}')";>Remove</a></p>`;
         priceContainer.innerHTML += `<p class="tasks" id='${service.priceID}'> <span>$</span>${service.getPrice()}</p>`;
         totalCostP.textContent = "$"+calcTotal();
         
         if(numOfItems > 0)
         {
            height += 8 ;
            document.getElementById("mid-section").style.height  = height + "vh"; 
         }
         numOfItems++;

   }
   else{
      let updatedPrice =document.getElementById(service.priceID) ; 
      updatedPrice.innerHTML =  `<span>$</span>${service.totalPrice}`
      calcTotal();
      totalCostP.textContent = "$"+calcTotal();

   }
   
}

function removItemRender()
{
   totalCostP.textContent = "$"+calcTotal();
   numOfItems --;
   if ( numOfItems > 0)
   {
      height -= 8 ;
      document.getElementById("mid-section").style.height  = height + "vh"; 
   }
}

function calcPrice(serve)
{
   for(let i = 0 ; i < customerServices.length ; i++)
   {
      if(customerServices[i].serviceName === serve.serviceName)
      {
         customerServices[i].totalPrice += serve.getPrice();
         break;
      }
       
   }
}


function addTasks(serve){
   if(!customerServices.includes(serve))
   {  
      customerServices.push(serve);
      calcPrice(serve)
      render(serve , true);

      console.log(customerServices)

   }
   else{
      calcPrice(serve)
      render(serve , false);
      console.log(customerServices)

      
   }
}


let washBtn = document.getElementById('wash');
washBtn.addEventListener("click",function(){
   addTasks(washCar)
} )

let mowBtn = document.getElementById('mow');
mowBtn.addEventListener("click",function(){
   addTasks(mowLawn)

} )

let pullBtn = document.getElementById('pull');
pullBtn.addEventListener("click",function(){
   addTasks(pullWeeds)

} )


function sendMail()
{


   let custEmail = document.forms['send-btn'].elements['mail'].value;
   let mailBody = "Hello from inovice generator system " + "<br>"
                 + "your pill details is : " ;


   // create object to hold cutomer data
   let newCustomer = new Customer(custEmail ,customerServices ,calcTotal ())

   for(let i = 0 ; i < customerServices.length ; i++)
   {
      mailBody += "<br>"+newCustomer.custServices[i].serviceName+" $"+newCustomer.custServices[i].totalPrice ;
      
   }
   mailBody += '<br> Your total cost is :  $'+newCustomer.totalCost;
   mailBody += "<br> Thank you for using our application";
   
   if (newCustomer.custServices.length != 0)
   {
     
      sendEmail(mailBody , newCustomer.email);
   }
   else{
      alert(("You do not take any tasks").toUpperCase())
   }
   return false;
}
/*
let sendButton = document.getElementById('send-btn');
sendButton.addEventListener("submit",function(){

   
   
} 
)
*/
function calcTotal (){
   let total = 0;
   for(let i = 0 ; i < customerServices.length ; i++)
   {
      total += customerServices[i].totalPrice ; 
   }
   return total;
}


function remove(servName)
{

   for(let i = 0 ; i < customerServices.length ; i++)
   { 
      if(customerServices[i].serviceName === servName)
      {
         console.log("Hello "+servName)
         let taskEl = document.getElementById(customerServices[i].taskID)
         taskEl.remove();
         let priceEl = document.getElementById(customerServices[i].priceID)
         priceEl.remove();
         customerServices[i].totalPrice = 0 ;
         customerServices.splice(i, 1); 
         removItemRender();
         break;
      }
   }


}


function sendEmail(mailBody , reciverMail) {

  // console.log(mailBody + "\n" + reciverMail)
   //hdksfymeupqxipem
   
      Email.send({
         Host : "smtp.gmail.com",
         Username : "invoicegeneratoromda@gmail.com",
         Password : "hdksfymeupqxipem",
         To : reciverMail,
         From : "invoicegeneratoromda@gmail.com",
         Subject : "Invoice Generator receipt",
         Body : mailBody
      }).then(
         message => alert("Email Sent Successfully")
      );


}
       