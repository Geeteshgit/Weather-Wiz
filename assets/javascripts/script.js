window.addEventListener("DOMContentLoaded",initEvents);
function initEvents(){

    // Swiper Code

    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 4,
        spaceBetween: 10,
        keyboard: true,
    });

    // Variables Declaration

    const apiKey1 = "g5vyRkX3ehHHD9syhfF0CbBCT4AifVK7";
    const apiKey2 = "6DEEQz56RxvCj3AS2vm5pwingYRRW9lw";
    const apiKey3 = "6YKB82OZ0NnvJ74v9H8hGMxrtGbEX3O8";
    const header = document.querySelector("#header");
    const locationText = document.querySelector("#location");
    const searchForm = document.querySelector("#searchform");
    const searchBar = document.querySelector("#searchbar");
    const weekBtn = document.querySelector(".hourly-text p");
    const homePage = document.querySelector("#home");
    const weekPage = document.querySelector("#days");
    const welcomePage = document.querySelector("#welcome");
    const backBtn = document.querySelector(".back-icon");
    const searchCity = document.querySelector("#welcome p");
    const currentWeatherConditions = document.querySelector("#temp-icon"); 
    const hourlyData = document.querySelector(".swiper-wrapper");
    const cityCards = document.querySelector("#cards-container");
    const weeklyData = document.querySelector("#weekly-data");
    const tempData = document.querySelector("#temp-data");
    let location;
    let locationKey;
    let bangaloreKey = "1-204108_1_AL";
    let mumbaiKey = "204842";
    let newDelhiKey = "187745";
    let currentLocation;
    let currentWeatherData;
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const todayDate = new Date();
    const currDay = days[todayDate.getDay()], currDate = todayDate.getDate(), currMonth = months[todayDate.getMonth()];

    // Event Listeners

    locationText.addEventListener("click",()=>{
        searchBar.focus();
    });

    searchForm.addEventListener("submit",(e)=>{
        e.preventDefault();
        location = searchBar.value;
        searchBar.value = "";
        cityCards.innerHTML = "";
        weeklyData.innerHTML = "";
        getLocation();
    });

    searchCity.addEventListener("click",()=>{
        searchBar.focus();
    });

    weekBtn.addEventListener("click",()=>{
        homePage.classList.toggle("hide");
        weekPage.classList.toggle("hide");
    });

    backBtn.addEventListener("click",()=>{
        homePage.classList.toggle("hide");
        weekPage.classList.toggle("hide");
    });

    // Location Key Function

    async function getLocation(){
        try {
            const searchLocation = await fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey1}&q=${location}`);
            let locationData = await searchLocation.json();
            locationData = locationData[0];
            locationKey = locationData.Key;
            locationText.innerHTML =            
                                `<i class="ri-map-pin-line"></i>
                                <div>
                                    <h4>${locationData.LocalizedName}, ${locationData.Country.EnglishName}</h4>
                                    <p>${currDay}, ${currDate} ${currMonth}</p>
                                </div>`;
            welcomePage.classList.add("hide");
            homePage.classList.remove("hide");
            locationText.classList.remove("hide");
            weekPage.classList.add("hide");
            header.style.justifyContent = "space-between";
            getData();
            getHourlyData();
            bangaloreData();
            mumbaiData();
            newDelhiData();
            getWeeklyWeather();
        } catch (error) {
            console.log(error);
            searchCity.innerText = "Location Not Found!";
            homePage.classList.add("hide");
            locationText.classList.add("hide");
            welcomePage.classList.remove("hide")
        }
    }

    // Current Weather Function

    async function getData(){
        try{
            const currentWeather = await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey1}`);
            let currentConditions = await currentWeather.json();
            currentConditions = currentConditions[0];
            currentWeatherConditions.innerHTML = 
                                        `<div>
                                            <h1 id="temperature">${currentConditions.Temperature.Metric.Value}°C</h1>
                                            <p id="weather-text">${currentConditions.WeatherText}</p>              
                                        </div>
                                        <div id="icon">
                                            <img src="./assets/images/Weather Icons/${currentConditions.WeatherIcon}.png" alt="temp-icon">
                                        </div>`;  
        }
        catch(error){
            console.log(error);
        }
    }

    // Hourly Weather Forecast Function

    async function getHourlyData(){
        try{
            const hourlyWeather = await fetch(`http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locationKey}?apikey=${apiKey2}`);
            let hourlyConditions = await hourlyWeather.json();
            for(let i=0;i<12;i++){
                hourlyData.innerHTML += 
                            `<div class="swiper-slide">
                                <div>
                                    <h4>${Math.floor((hourlyConditions[i].Temperature.Value-32)*5/9)}°C</h4>
                                    <div>
                                        <img src="./assets/images/Weather Icons/${hourlyConditions[i].WeatherIcon}.png" alt="temp-icon">
                                    </div>
                                    <p>${hourlyConditions[i].DateTime.slice(11,16)}</p>
                                </div>
                            </div>`;
            }
        }
        catch(error){
            console.log(error);
        }
    }

    // City Cards Weather Data Functions

    async function bangaloreData(){
        try{
            const currentWeather = await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${bangaloreKey}?apikey=${apiKey3}`);
            let currentConditions = await currentWeather.json();
            currentConditions = currentConditions[0];
            cityCards.innerHTML += 
                                `<div class="city-cards">
                                    <div class="city-icon">
                                        <img src="./assets/images/Weather Icons/${currentConditions.WeatherIcon}.png" alt="temp-icon">
                                    </div>
                                    <div class="city-card-text">
                                        <h4>Bangalore</h4>
                                        <p>${currentConditions.WeatherText}</p>
                                    </div>
                                    <h4>${currentConditions.Temperature.Metric.Value}°C</h4>
                                </div>`;
        }
        catch(error){
            console.log(error);
        }
    }

    async function mumbaiData(){
        try{
            const currentWeather = await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${mumbaiKey}?apikey=${apiKey3}`);
            let currentConditions = await currentWeather.json();
            currentConditions = currentConditions[0];
            cityCards.innerHTML += 
                                `<div class="city-cards">
                                    <div class="city-icon">
                                        <img src="./assets/images/Weather Icons/${currentConditions.WeatherIcon}.png" alt="temp-icon">
                                    </div>
                                    <div class="city-card-text">
                                        <h4>Mumbai</h4>
                                        <p>${currentConditions.WeatherText}</p>
                                    </div>
                                    <h4>${currentConditions.Temperature.Metric.Value}°C</h4>
                                </div>`;
        }
        catch(error){
            console.log(error);
        }
    }

    async function newDelhiData(){
        try{
            const currentWeather = await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${newDelhiKey}?apikey=${apiKey3}`);
            let currentConditions = await currentWeather.json();
            currentConditions = currentConditions[0];
            cityCards.innerHTML += 
                                `<div class="city-cards">
                                    <div class="city-icon">
                                        <img src="./assets/images/Weather Icons/${currentConditions.WeatherIcon}.png" alt="temp-icon">
                                    </div>
                                    <div class="city-card-text">
                                        <h4>New Delhi</h4>
                                        <p>${currentConditions.WeatherText}</p>
                                    </div>
                                    <h4>${currentConditions.Temperature.Metric.Value}°C</h4>
                                </div>`;
        }
        catch(error){
            console.log(error);
        }
    }

    // Weekly Weather Forecast Function

    async function getWeeklyWeather(){
        try{
            const weeklyWeather = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey2}`);
            let weeklyConditions = await weeklyWeather.json();
            tempData.innerHTML = 
                           `<div class="data-icon">
                                <h4>${Math.floor((weeklyConditions.DailyForecasts[0].Temperature.Minimum.Value-32)*5/9)}°C</h4>
                                <p>Min. Temp</p>
                            </div>
                            <div class="data-icon">
                                <h4>${(Math.floor((((weeklyConditions.DailyForecasts[0].Temperature.Maximum.Value-32)*5/9)+(((weeklyConditions.DailyForecasts[0].Temperature.Minimum.Value-32)*5/9)))/2))}°C</h4>
                                <p>Avg. Temp</p>
                            </div>
                            <div class="data-icon">
                                <h4>${Math.floor((weeklyConditions.DailyForecasts[0].Temperature.Maximum.Value-32)*5/9)}°C</h4>
                                <p>Max. Temp</p>
                            </div>`;

            for(let i=1;i<5;i++){
                let weeklyDate = new Date(weeklyConditions.DailyForecasts[i].Date);
                let day = days[weeklyDate.getDay()], month = months[weeklyDate.getMonth()], date = weeklyDate.getDate();
                weeklyData.innerHTML += 
                    `<div class="day-data">
                        <div id="date">
                            <h4>${day}</h4>
                            <p>${month}, ${date}</p>
                        </div>
                        <div id="day-temp">
                            <h4>${(Math.floor((((weeklyConditions.DailyForecasts[i].Temperature.Maximum.Value-32)*5/9)+(((weeklyConditions.DailyForecasts[i].Temperature.Minimum.Value-32)*5/9)))/2))}°C</h4>
                            <p>${weeklyConditions.DailyForecasts[i].Day.IconPhrase}</p>
                        </div>
                        <div id="day-max-min">
                            <div class="max-min">
                                <div class="min">
                                    <h4>${Math.floor((weeklyConditions.DailyForecasts[i].Temperature.Minimum.Value-32)*5/9)}°C</h4>
                                    <p>Min. Temp</p>
                                </div>
                                <div class="max">
                                    <h4>${Math.floor((weeklyConditions.DailyForecasts[i].Temperature.Maximum.Value-32)*5/9)}°C</h4>
                                    <p>Max. Temp</p>
                                </div>
                            </div>
                        </div>
                        <div id="day-data-img">
                            <img src="./assets/images/Weather Icons/${weeklyConditions.DailyForecasts[i].Day.Icon}.png" alt="temp-icon">
                        </div>
                    </div>`;
            }
        }
        catch(error){
            console.log(error);
        }
    }
};
