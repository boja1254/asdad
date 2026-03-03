
document.getElementById("serviceForm")?.addEventListener("submit", async function(e){
e.preventDefault();

let service=document.getElementById("service").value;
let name=document.getElementById("name").value;
let slot=document.getElementById("slot").value;

const res=await fetch("/api/payment/create-order",{method:"POST"});
const order=await res.json();

var options={
key:"YOUR_PUBLIC_KEY",
amount:order.amount,
currency:"INR",
order_id:order.id,
handler:async function(response){

const verify=await fetch("/api/payment/verify",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(response)
});

const result=await verify.json();

if(result.success){
let msg=`Hello, I paid ₹50 for ${service}. Name: ${name}, Slot: ${slot}`;
window.location.href="https://wa.me/918409019510?text="+encodeURIComponent(msg);
}else{
alert("Payment verification failed");
}
}
};

var rzp=new Razorpay(options);
rzp.open();
});
