const cityEl = document.querySelector(".city");
const iconEl = document.getElementById("icon");
const tempEl = document.querySelector(".temp");
const highEl = document.querySelector(".high");
const lowEl = document.querySelector(".low");
const humidityEl = document.querySelector(".humidity");
const windEl = document.querySelector(".wind");
const uvindexEl = document.querySelector(".uv-index");




const clock = document.querySelector("#currentDay");
const apiKey = '00f12fe173cc605c324a6464e403da46';

const citySearch = document.querySelector("#citySearch");

const currentBox = document.querySelector("#current-box");

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

        let cityValue = data.name;
        let temp = data.main.temp;
        let highTemp = data.main.temp_max;
        let lowTemp = data.main.temp_min;
        let humidity = data.main.humidity;
        let windSpeed = data.wind.speed;
        let weatherPic = data.weather[0].icon;

        let lon = data.coord.lon;
        let lat = data.coord.lat;
        

        

          cityEl.innerHTML = cityValue;
          tempEl.innerHTML = 'Temperature: ' + temp.toFixed() + ' F';
          highEl.innerHTML = 'High: ' + highTemp.toFixed() + ' F';
          lowEl.innerHTML = 'Low: ' + lowTemp.toFixed() +' F';
          humidityEl.innerHTML = 'Humidity: ' + humidity.toFixed() + ' %';
          windEl.innerHTML = 'Wind: ' + windSpeed.toFixed() + ' MPH';
          iconEl.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
          
          
          
          
          currentBox.style.borderStyle = 'dashed';
          currentBox.style.backgroundColor = '#483D8B';
        

        
        
    return fetch('http://api.openweathermap.org/data/2.5/uvi?appid='+apiKey+'&lat='+lat+'&lon='+lon)

    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let uvIndex = data.value;
      uvindexEl.innerHTML = 'UV-Index: ' +uvIndex;

      if ( uvIndex >= 6) {
        uvindexEl.style.backgroundColor = '#DC143C';
      } else if (uvIndex > 2 & uvIndex < 6) {
        uvindexEl.style.backgroundColor = '#FFFF00';
      } else {
        uvindexEl.style.backgroundColor = '#00FF7F';
      }
    }
    );
  });
}



function fiveDay() {
  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + citySearch.value + '&APPID=' + apiKey + '&units=imperial')

  .then((response) => {
    return response.json();
  })
  .then((data) => {

      for (var i = 0; i < 33; i += 8) {

      let temp = data.list[i].main.temp;
      let humidity = data.list[i].main.humidity;
      let currentDay = moment(data.list[i].dt_txt).format("MM/DD");
      let weatherPic = data.list[i].weather[0].icon;



      let tempEl = document.querySelector(`#temp${i}`);
      let humidityEl = document.querySelector('#hum' + i);
      let dayEl = document.querySelector('#day' + i);
      let iconEl = document.getElementById('icon' + i);

      tempEl.textContent = 'Temperature: ' + temp.toFixed() +' F';
      humidityEl.textContent = 'Humidity: ' + humidity.toFixed() +' %';
      dayEl.textContent = currentDay;
      iconEl.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
    }
      
      let fiveDay1El = document.querySelector("#five-day1");
      let fiveDay2El = document.querySelector("#five-day2");
      let fiveDay3El = document.querySelector("#five-day3");
      let fiveDay4El = document.querySelector("#five-day4");
      let fiveDay5El = document.querySelector("#five-day5");

      fiveDay1El.style.borderStyle = 'dashed';
      fiveDay2El.style.borderStyle = 'dashed';
      fiveDay3El.style.borderStyle = 'dashed';
      fiveDay4El.style.borderStyle = 'dashed';
      fiveDay5El.style.borderStyle = 'dashed';

      fiveDay1El.style.backgroundColor = '#483D8B';
      fiveDay2El.style.backgroundColor = '#483D8B';
      fiveDay3El.style.backgroundColor = '#483D8B';
      fiveDay4El.style.backgroundColor = '#483D8B';
      fiveDay5El.style.backgroundColor = '#483D8B';
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




  

  