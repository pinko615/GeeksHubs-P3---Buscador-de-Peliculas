const apiKey = config.API_KEY
const urlImagen = 'https://image.tmdb.org/t/p/w200';
const baseURL = 'http://image.tmdb.org/t/p/'
const button = document.getElementById("btn");


// banner aleatorio principal

var peliculasPopulares = []

function getTrendingList () {
    const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
  
    fetch(url)
      .then(data => {
        return data.json()
      })
      .then(res => {
        peliculasPopulares = res.results
        setBannerImage(peliculasPopulares)
      })
  }

window.onload = function() {
    getTrendingList()
}

function setBannerImage (res) {
    let randomItem = res[Math.floor(Math.random() * 20 + 1)]
    let header = document.getElementById('header')
    header.style.background = randomItem ? `linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)), url(${baseURL}original/${randomItem.backdrop_path}) no-repeat top` : '#78909C'
    header.style.backgroundSize = 'cover'
  }


// buscar peliculas

function buscar() {
  let count =0;
  let filmsToSearch= "";
  let k = 0;
  let overView = "";
  let rated=0;
  let temp;
  let search = document.getElementById("query").value;
  if(search.length === 0)
  
  document.getElementById('titulo').innerHTML = '';
  axios({
      method: 'GET',
      url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=es-ES&query=${search}}`
  }).then(res => {
      let movies = res.data.results;
      
      for (let i = 0;  i< 6; i++) {
       if(movies[i].poster_path!=null) {
          filmsToSearch += 
          `
          <div class="peliculas">
          <p class="Year">🗓 ${movies[i].release_date}</p>
          <a href="#"><img src="${urlImagen}${movies[i].poster_path}" class="movieImg"></a>
          <a href="#"><h3 class="title">${movies[i].title}</h3></a>
          <p>⭐️ ${movies[i].vote_average}</p>
          </div>
          `;
          document.getElementById('First').innerHTML = filmsToSearch;
             }
          }  
              filmsToSearch='';                
             for (let i = 6;  i< 12; i++) {
              if(movies[i].poster_path!=null) {
              filmsToSearch += 
              `
              <div class="peliculas">
              <p class="Year">🗓 ${movies[i].release_date}</p>
              <a href="#"><img src="${urlImagen}${movies[i].poster_path}" class="movieImg"></a>
              <h3 class="title">${movies[i].title}</h3>
              <p>⭐️ ${movies[i].vote_average}</p>
              </div>
              `;
                  document.getElementById('Second').innerHTML = filmsToSearch;
                  
                 }      
              }
                 filmsToSearch='';                
                 for (let i = 12;  i< 19; i++) {
                  if(movies[i].poster_path!=null){
                  filmsToSearch += 
                  `
                  <div class="peliculas">
                  <p class="Year">🗓 ${movies[i].release_date}</p>
                  <a href="#"><img src="${urlImagen}${movies[i].poster_path}" class="movieImg"></a>
                  <h3 class="title">${movies[i].title}</h3>
                  <p>⭐️ ${movies[i].vote_average}</p>
                  </div>
                  `;
                      document.getElementById('Third').innerHTML = filmsToSearch;
                      
                     }      
                 }
                 
              })
}


