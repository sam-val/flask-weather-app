const search_field = document.querySelector('#search-box');
const suggest_field = document.querySelector('#suggest-box');

search_field.addEventListener('input', suggest_city);
suggest_field.addEventListener('click', set_search_text);
function suggest_city() {
    let text = this.value.toLowerCase().trim();
    let options = [];
    for(let item of cities) {
          let city = item['name'].trim().toLowerCase();
          if (city === text) {
              suggest_field.value = city + "," + item['country'];
              return;
          }
          else if (city.startsWith(text) || city.includes(text)) {
              options.push([city, item['country']])
          }

    }
    if (options.length > 1) {
      let min_length_item = options[0];
      for (let i=0; i< options.length; i++) {
          if (options[i][0].length < min_length_item[0].length) {
              min_length_item = options[i];
          }
      }
      suggest_field.value = min_length_item[0] + "," + min_length_item[1];
      return;
    }
}

function set_search_text() {
    search_field.value = this.value;

}

function geoFindMe() {
    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');
  
    mapLink.href = '';
    mapLink.textContent = '';
  
    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;

      $.post('/location', {
        lat: latitude,
        lon: longitude
      }).done(function(response){

          alert(JSON.stringify(response))
          update_map(response['coord']['lon'], response['coord']['lat']);
      })
    }
  
    function error() {
      status.textContent = 'Unable to retrieve your location';
    }
  
    if(!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
  
  }


  
  document.querySelector('#find-me').addEventListener('click', geoFindMe);