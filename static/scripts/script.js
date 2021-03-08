const search_field = document.querySelector('#search-box');
const suggest_field = document.querySelector('#suggest-box');

search_field.addEventListener('input', suggest_city);
suggest_field.addEventListener('click', set_search_text);
const hidden_field = document.querySelector('#city_id');
const weather_field = document.querySelector('#weather-field');

function suggest_city() {
    let text = this.value.toLowerCase().trim();
    for(let i=0; i < cities.length; i++ ) {
          let item = cities[i]
          let city = item['name'].trim();
        
          if (city.toLowerCase() === text && city.length <= text.length ) {
                  suggest_field.value = city + ", " + item['country'];
                  hidden_field.value =  item['id'];
                  return;
          }else if (city.toLowerCase().startsWith(text)) {
                  suggest_field.value = city + ", " + item['country'];
                  hidden_field.value =  item['id'];
                  return;
          }else if (city.toLowerCase().includes(text) ) {
                  suggest_field.value = city + ", " + item['country'];
                  hidden_field.value =  item['id'];
                  return;
          }
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
            // alert(JSON.stringify(response))
            weather_field.innerHTML = JSON.stringify(response);
            update_map(response['coord']['lon'], response['coord']['lat']);
          })

}



  
  document.querySelector('#get-weather').addEventListener('click', get_weather);