const search_field = document.querySelector('#search-box');
const suggest_field = document.querySelector('#suggest-box');

search_field.addEventListener('input', suggest_city);
suggest_field.addEventListener('click', set_search_text);
const hidden_field = document.querySelector('#city_id');
const weather_field = document.querySelector('#weather-field');
const weather_icon = document.querySelector('#wicon');
const weather_place = document.querySelector('#wplace');
const weather_flag = document.querySelector('#wflag');
const weather_main = document.querySelector('#wmain');
const weather_wind_speed = document.querySelector('#wwind-speed');
const weather_humidity = document.querySelector('#whumid');
const weather_temp = document.querySelector('#wtemp');
const weather_time = document.querySelector('#time');

function suggest_city() {
    let text = this.value.toLowerCase().trim();
    startsWith = []
    includes = []
    for(let i=0; i < cities.length; i++ ) {
          let item = cities[i]
          let city = item['name'].trim();
        
          if (city.toLowerCase() === text && city.length <= text.length ) {
                  suggest_field.value = city + ", " + item['country'];
                  hidden_field.value =  item['id'];
                  return;
          }else if (city.toLowerCase().startsWith(text)) {
                  startsWith.push([city, item['country'], item['id']])
          }else if (city.toLowerCase().includes(text) ) {
                  includes.push([city, item['country'], item['id']])
          }
    }

    if (startsWith.length > 1) {
        suggest_field.value = startsWith[0][0] + ", " + startsWith[0][1];
        hidden_field.value =  startsWith[0][2];
        return;

    }
    if (includes.length > 1) {
        suggest_field.value = includes[0][0] + ", " + includes[0][1];
        hidden_field.value =  includes[0][2];
        return;

    }

}

function set_search_text() {
    search_field.value = this.value;

}

function get_weather() {
    var id = hidden_field.value;
    console.log("id is " ,id);
  $.post('/weatherbycity', {

      id: id

  }).done(function(response){
        update_weather(response);
  })
            

}

function update_weather(response) {
    weather_flag.src = `http://openweathermap.org/images/flags/${response['sys']['country'].toLowerCase()}.png`
    weather_wind_speed.innerHTML = `Wind speed: ${response['wind']['speed']}` 
    weather_humidity.innerHTML = `Humidity: ${response['main']['humidity']}`
    weather_temp.innerHTML = `${ (response['main']['temp'] - 273.15).toFixed(1) }°С `
    weather_main.innerHTML = response['weather'][0]['main']
    weather_icon.src = `http://openweathermap.org/img/wn/${response['weather'][0]['icon']}@4x.png`
    weather_place.innerHTML =  `${response['name']}, ${response['sys']['country']}`
    // weather_time.innerHTML = `${time.getFullYear()}-${time.getMonth()}-${time.getDate()} ${time.getHours().toString().padStart(2,'0')}:${time.getMinutes().toString().padStart(2,'0')}`
    weather_time.innerHTML = response['time_string'];
    update_map(response['coord']['lon'], response['coord']['lat']);

}

  
  document.querySelector('#get-weather').addEventListener('click', get_weather);