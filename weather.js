const wrapper = document.querySelector(".wrapper"),
inputPart =wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
wIcon= document.querySelector(".weather-part img"),
arrowBack = wrapper.querySelector("header i");
let api;
//for getting city in input
inputField.addEventListener("keyup", e =>{
    //If user pressed enter btn or input value is not empty
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
})

//working on get location btn for getting latitude and longitude
locationBtn.addEventListener("click", ()=>{
  if(navigator.geolocation){//if browser supports the geolocation
    navigator.geolocation.getCurrentPosition(onsuccess,onerror);
  }
  else{
    alert("Your browser not supports the geolocation");
  }
});

function onsuccess(position){
    const{latitude, longitude} =position.coords;//getting latitude and longitude from coords
     api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=331402349d907a2dd1e4c0e720d73044`;

    fetchData();

}
function onerror(error){
    infoTxt.innerHTML=error.message;
    infoTxt.classList.add("error");
}
let apikey='331402349d907a2dd1e4c0e720d73044';
//getting weather details from weather api
function requestApi(city){
     api=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
    fetchData();
}
//fetching data
function fetchData(){
    infoTxt.innerHTML= "Getting Weather details..";
    infoTxt.classList.add("pending");
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
};
//getting details displayed 
function weatherDetails(info){
    infoTxt.classList.replace("pending","error");
    if(info.cod == "404"){
        infoTxt.innerHTML=`${inputField.value} is not a valid city name`;
    }
    else{
        //getting required properties from console
        const city = info.name;
        const country=info.sys.country;
        const {description, id}=info.weather[0];
        const{feels_like,humidity,temp}=info.main;
        const lati=info.coord.lat;
        const longi=info.coord.lon;
       if(id==800){
          wIcon.src= "icons/clear.svg";
       }else if(id>=200 && id<=232){
        wIcon.src= "icons/storm.svg";
     }else if(id>=600 && id<=622){
        wIcon.src= "icons/snow.svg";
     }else if(id>=701 && id<=781){
        wIcon.src= "icons/haze.svg";
     }else if(id>=801 && id<=804){
        wIcon.src= "icons/cloud.svg";
     }else if((id>=300 && id<=321)||(id>=500 && id<=531)){
        wIcon.src= "icons/rain.svg";
     }
        //passing values into a html element
      
        wrapper.querySelector(".temp .numb").innerHTML=Math.floor(temp);
        wrapper.querySelector(".weather").innerHTML=description;
        wrapper.querySelector(".location span").innerHTML=`${city} , ${country}`;
        wrapper.querySelector(".temp .numb-2").innerHTML=Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerHTML=`${humidity}%`;
        infoTxt.classList.remove("pending","error");
        wrapper.classList.add("active");
        countryL.innerHTML=lati+'N'+longi+'E'
    }
    console.log(info);
}

arrowBack.addEventListener("click",()=>{

    wrapper.classList.remove("active");
    countryL.innerHTML="IN";

   
})

//timezone 
const timeP=document.getElementById("time");
const dateP=document.querySelector(".date");
const countryL=document.querySelector(".country");
const timezP=document.querySelector(".time-zone");

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

setInterval(()=>{
    const Time= new Date();
    const month= Time.getMonth();
    const date= Time.getDate();
    const day= Time.getDay();
    const hour= Time.getHours();
    const minute=Time.getMinutes();
    const Hourin12hrformat=hour>12?hour%12:hour;
    const ampm = hour >=12 ? 'PM' : 'AM';
    timeP.innerHTML=(Hourin12hrformat<10? '0'+Hourin12hrformat:Hourin12hrformat )+ ':'+(minute<10?"0"+minute:minute)+" "+`<span id="am-pm">${ampm}</span>`
    dateP.innerHTML = days[day] + ', ' + date+ ' ' + months[month]
},1000);