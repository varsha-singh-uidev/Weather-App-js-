// getting the dom element
let temp = document.querySelector(".temp");
let place = document.querySelector(".place");
let humidity = document.querySelector(".percent");
let speed = document.querySelector(".speed");
let input = document.querySelector(".input");
let search = document.querySelector(".search");
let image = document.querySelector(".picture");
let card = document.querySelector(".card");

let city; //globall variable

// updating the weather image 
function icon(weather_img){

   if(weather_img === "Clear"){
    image.src = "images/clear.png";
    image.classList.add("rotate");
    card.style.background = "linear-gradient(rgb(247, 233, 199),rgb(237, 188, 53))";
   }
   else if(weather_img === "Clouds"){
    image.classList.remove("rotate");
    card.style.background = "linear-gradient( #bdc3c7, #2c3e50)"
    image.src = "images/clouds.png";
   }
   else if(weather_img === "Drizzle"){
    image.classList.remove("rotate");
    card.style.background = "linear-gradient(135deg, #b993d6, #8ca6db)";
    image.src = "images/drizzle.png";
   }
   else if(weather_img === "Haze"){
    image.classList.remove("rotate");
    card.style.background = "linear-gradient(135deg,rgb(180, 170, 204) 0%,rgb(184, 171, 200) 20%)";
    image.src = "images/haze.png";
   }
   else if(weather_img === "Humidity"){
    image.classList.remove("rotate");
    card.style.background = "linear-gradient(135deg,rgb(172, 88, 206),rgb(136, 92, 206))";
    image.src = "images/humidity.png";
   }
   else if(weather_img === "Mist"){
    image.classList.remove("rotate");
    card.style.background = "linear-gradient(135deg,rgb(155, 177, 248),rgb(193, 186, 186))";
    image.src = "images/mist.png";
   }
   else if(weather_img === "Rain"){
    image.classList.remove("rotate");
    card.style.background = "linear-gradient(rgb(90, 125, 207),rgb(25, 50, 99))";
    image.src = "images/rain.png";
   }
   else if(weather_img === "Snow"){
    image.classList.remove("rotate");
    card.style.background = "linear-gradient(130deg,rgb(194, 204, 221) 0%,rgb(150, 185, 235) 20%)";
    image.src = "images/snow.png";
   }
   else if(weather_img === "Wind"){
    image.classList.remove("rotate");
    card.style.background = "linear-gradient(135deg,rgb(140, 105, 206),rgb(46, 163, 126))";
    image.src = "images/wind.png";
   }
}

// declaring the api
const apiKey = "46d47581a51a79782741111953e700af";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

async function checkWeather(){
    const response = await fetch(`${apiUrl}&q=${city}` + `&appid=${apiKey}`);

    if(response.status === 404){  
        card.style.background = "linear-gradient(155deg, #9985c7 20%, #ecb8dd 100%)"; 
        document.querySelector(".msg").textContent = "😶‍🌫️ Invalid city name";
        document.querySelector(".msg").style.display = "block";
        document.querySelector(".head").style.display = "block";
        document.querySelector('.weather').style.display = "none";
    }
    else{
        document.querySelector(".msg").style.display = "none";
        document.querySelector(".head").style.display = "none";
        document.querySelector('.weather').style.display = "flex";
        var data = await response.json();
        console.log(data);
        temp.textContent = `${Math.round(data.main.temp)}°C`;
        humidity.textContent = `${data.main.humidity}%`;
        speed.textContent = `${data.wind.speed}km/h`
        place.textContent = data.name;
        icon(data.weather[0].main);
    }
};

// function invoked when the user click on the search button
search.addEventListener("click", function() {
    document.querySelector(".head").style.display = "none";
    city = input.value;
    checkWeather();
});

// function invoked when the user enter into the input field
input.addEventListener("keydown", function(event) {
    if(event.key === "Enter"){
        document.querySelector(".head").style.display = "none";
        city = input.value;
        checkWeather();
    }
});