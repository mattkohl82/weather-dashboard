var cityEl = document.querySelector(".city");
//var iconEl = document.createElement(".icon");
var tempEl = document.querySelector(".temp");
var highEl = document.querySelector(".high");
var lowEl = document.querySelector(".low");
var humidityEl = document.querySelector(".humidity");
var windEl = document.querySelector(".wind");
var clock = document.querySelector("#currentDay");
const apiKey = '00f12fe173cc605c324a6464e403da46';

const citySearch = document.querySelector("#citySearch");

var currentBox = document.querySelector("#current-box");

function updateTime() {
    const now = moment();
    const readTime = now.format("MMM DD, YYYY - hh:mm:ssA");
    
    clock.textContent = readTime;
}

setInterval(updateTime, 100);

updateTime();

function myFunction() {
    
    
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + citySearch.value + '&APPID=' + apiKey + '&units=imperial')

    .then((response) => {
      return response.json();
    })
    .then((data) => {


        let cityValue = data['name'];
        //let icon = data['weather']['icon'];
        let temp = data['main']['temp'];
        let highTemp = data['main']['temp_max'];
        let lowTemp = data['main']['temp_min'];
        let humidity = data['main']['humidity'];
        let windSpeed = data['wind']['speed'];
        

          cityEl.innerHTML = cityValue;
          tempEl.innerHTML = 'Temperature: ' + temp + 'F';
          highEl.innerHTML = 'High: ' + highTemp + 'F';
          lowEl.innerHTML = 'Low: ' + lowTemp +'F';
          humidityEl.innerHTML = 'Humidity: ' + humidity + '%';
          windEl.innerHTML = 'Wind: ' + windSpeed + ' MPH';
          currentBox.style.borderStyle = 'dashed';

  });
}



function fiveDay() {
  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + citySearch.value + '&APPID=' + apiKey + '&units=imperial')

  .then((response) => {
    return response.json();
  })
  .then((data) => {

    for (var i = 0; i < 33; i += 8) {
    let temp = data['list'][i]['main']['temp'];
      console.log(data);
    
    
    var tempEl = document.querySelector(`#temp${i}`);

    tempEl.textContent = 'Temp: ' + temp;
  }
})
}



document.getElementById("search").addEventListener("click", function() {
  fiveDay();
  myFunction();

  let searchHistory = localStorage.getItem("searchHistory");
  if(searchHistory) {
    searchHistory = JSON.parse(searchHistory)
    searchHistory.push(citySearch.value);

  } else {
    searchHistory = [citySearch.value];
     
  }

  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
});




  

  