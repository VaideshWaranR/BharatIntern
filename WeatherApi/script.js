let bg={
    Thunderstorm:"thunderstorm.gif",
    Drizzle:"rain.gif",
    Rain:"rain.gif",
    Snow:"snow.gif",
    Clear:"clear.gif",
    Clouds:"clouds.gif",
    Mist:"fog.gif",
    Smoke:"fog.gif",
    Haze:"haze.gif",
    Dust:"haze.gif",
    Fog:"fog.gif",
    Sand:"fog.gif",
    Ash:"fog.gif",
    Squall:"fog.gif",
    Tornado:"fog.gif",
}

let getweather=(w)=>{
    return bg[w];
}
let mintemp=document.querySelector("#min")
let maxtemp=document.querySelector("#max")
let mainTemp=document.querySelector(".weather-temp")
let mainWeather=document.querySelector(".weather-main")
let icon=document.querySelector(".weather-icon")
let city=document.querySelector("#weathercity");
let realFeel=document.querySelector(".feel")
let humidity=document.querySelector(".humidity")
let wind=document.querySelector(".wind")
let pressure=document.querySelector(".pressure")
let searchCity=document.querySelector(".search-bar")
document.querySelector(".nav").addEventListener("submit",(e)=>{
    e.preventDefault();
    weather(searchCity.value)
})

function CountryCode(country){
    let regionNames = new Intl.DisplayNames(["en"], {type: "region"});
    return regionNames.of(country)
}
let weather=async(srchcity)=>{
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${srchcity}&appid=c320db0e0a3a81c358979eda5ba80875&units=metric`
    let response=await fetch(url);
    console.log(response)
    if(response.status>=200 && response.status<=299){
    let data=await response.json();
    city.innerHTML = `<h1>${srchcity}, ${CountryCode(data.sys.country)}</h1>` 
    mainTemp.innerHTML=`<p>${data.main.temp}&#176C</p>`;
    mintemp.innerHTML=`<p>Min : ${data.main.temp_min}&#176C</p>`;
    maxtemp.innerHTML=`<p>Max : ${data.main.temp_max}&#176C</p>`;
    mainWeather.innerHTML=`<p>${data.weather[0].main}</p>`
    icon.innerHTML=`<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`
    realFeel.innerHTML=`<p>${data.main.feels_like}&#176</p>`
    humidity.textContent=`${data.main.humidity}%`
    wind.textContent=`${data.wind.speed} m/s`
    pressure.textContent=`${data.main.pressure} hpa`
    document.querySelector(".container").style.backgroundImage="snow.gif";
    console.log(searchCity.value);
    console.log(data)
    document.querySelector(".container").style.backgroundImage=`url(${getweather(data.weather[0].main)})`;
    console.log(data.weather[0].main)
    }
    else{
        document.querySelector(".main").style.display="none";
        document.querySelector("footer").style.display="none";
        document.querySelector(".error").style.display="flex";
        document.querySelector(".container").style.backgroundImage=`url("black.jpeg")`;
        console.log("Error while fetching the api")
        document.querySelector(".nav").addEventListener("submit",(e)=>{
            document.querySelector(".main").style.display="flex";
            document.querySelector("footer").style.display="flex";
            document.querySelector(".error").style.display="none";
            e.preventDefault();
            weather(searchCity.value)
        })
    }
}


