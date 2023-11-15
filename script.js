const global= {
  currentPage: window.location.pathname
};
const golo={
  currentPage: window.location.search.split('=')[1]
};
const sera={
  currentPage: window.location.search.split('term=')[1]
};

const quer=window.location.search;
const param=new URLSearchParams(quer);
let till=param.get('type');


async function displayPopularMovies(){
    const {results} = await fetchAPIData('movie/popular');
    results.forEach((item) => {
      const div=document.createElement('div');
      div.classList.add("card");
      div.innerHTML=`
            <div class="card">
            <a href="movie-details.html?id=${item.id}">
            <img
            src="https://image.tmdb.org/t/p/w500${item.poster_path}?api_key=d24a69f94e1ee79c49275818f351ebef"
            
            class="card-img-top"
            alt="Movie Title"
            />
            </a>
            <div class="card-body">
            <h5 class="card-title">${item.original_title}</h5>
            <p class="card-text">
            <small class="text-muted">${item.release_date}</small>
            </p>
            </div>`;
    const gere=document.querySelector('.grid');
    gere.appendChild(div);    
  }); 
}



async function displayMoviesDetails(){
    const movieId=window.location.search.split('=')[1];
    console.log(movieId);
    const movie=await fetchAPIData(`movie/${movieId}`);
    
    
    const div=document.createElement('div');
    div.innerHTML=`
            <div class="details-top">
            <div>
            <img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}?api_key=d24a69f94e1ee79c49275818f351ebef"
            class="card-img-top"
            alt="Movie Title"
            />
            </div>
            <div>
            <h2>${movie.title}</h2>
            <p>
            <i class="fas fa-star text-primary"></i>
            ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">${movie.release_date}</p>
              <p>
                ${movie.overview}
              </p>
              <h5>Genres</h5>
              <ul class="list-group">
              ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
              </ul>
              <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
              </div>
              </div>
          <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>

          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
          ${movie.production_companies.map((item) => `<span>${item.name}</span>`).join('')}
          </div>
          </div> `;


    const gere=document.querySelector('#movie-details');
    gere.appendChild(div);
}




async function fetchAPIData(endpoint){
  const API_KEY='d24a69f94e1ee79c49275818f351ebef';
  const API_URL='https://api.themoviedb.org/3/';
  
  const response= await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data=await response.json();
    return data;
  }





async function displayTVShows(){
    const liki=await fetch('https://api.themoviedb.org/3/tv/popular?api_key=d24a69f94e1ee79c49275818f351ebef&language=en-US')
    const data=await liki.json();
    // return data;
    const yere=data.results;
    // console.log(data.results);
    console.log(yere);
    // return data;

    yere.forEach(element => { 
    const div=document.createElement('div');
    div.className=("card");
    div.innerHTML=`
    <div class="card">
          <a href="tv-details.html?id=${element.id}">
            <img
              src="https://image.tmdb.org/t/p/w500${element.poster_path}?api_key=d24a69f94e1ee79c49275818f351ebef"
              class="card-img-top"
              alt="Show Title"
            />
          </a>
          <div class="card-body">
            <h5 class="card-title">${element.original_name}</h5>
            <p class="card-text">
              <small class="text-muted">Aired: ${element.first_air_date}</small>
            </p>
          </div>
        </div>`;
    const gere=document.querySelector('#popular-shows');
    gere.appendChild(div);
  })
  };





  
function highlightactivelink(){
    const links=document.querySelectorAll('.nav-link');
    links.forEach((link) => {
      if(link.getAttribute('href')===global.currentPage){
        link.classList.add('active');
      }
    });
}





async function displayTvDetails(id){
    const sete=await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=d24a69f94e1ee79c49275818f351ebef&language=en-US`)
    const data=await sete.json();
    const div=document.createElement('div');
    div.className="details-top";
    div.innerHTML=`
          <div class="details-top">
          <div>
            <img
              src="https://image.tmdb.org/t/p/w500${data.poster_path}?api_key=d24a69f94e1ee79c49275818f351ebef"
              class="card-img-top"
              alt="Show Name"
            />
          </div>
          <div>
            <h2>${data.original_name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${data.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: XX/XX/XXXX</p>
            <p>
              ${data.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              
            </ul>
            <a href="${data.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>`;
      const gere=document.querySelector('#show-details');
      gere.appendChild(div);

      const gem=data.genres;
      gem.forEach((lel) => {
        const li=document.createElement('li');
        li.innerText=lel.name; 
        const ul=document.querySelector('.list-group');
      ul.appendChild(li);
    })
}

async function displaySearchMovies(){
  const search1=await fetch(`https://api.themoviedb.org/3/search/movie?query=${sera.currentPage}&api_key=d24a69f94e1ee79c49275818f351ebef&language=en-US`)
  
  const data=await search1.json();
  const yera=data.results;

  yera.forEach((item) => {
    
      const div=document.createElement('div');
      div.className="card";
      div.innerHTML=`
      <div class="card">
            <a href="movie-details.html?id=${item.id}">
            <img
            src="https://image.tmdb.org/t/p/w500${item.poster_path}?api_key=d24a69f94e1ee79c49275818f351ebef"
            
            class="card-img-top"
            alt="Movie Title"
            />
            </a>
            <div class="card-body">
            <h5 class="card-title">${item.original_title}</h5>
            <p class="card-text">
            <small class="text-muted">${item.release_date}</small>
            </p>
             </div>`;
      
      const gere=document.getElementById('search-results');
      gere.appendChild(div); 
    })
}



async function displaySearchTv(){
    const search1=await fetch(`https://api.themoviedb.org/3/search/tv?query=${sera.currentPage}&api_key=d24a69f94e1ee79c49275818f351ebef&language=en-US`)
    const data=await search1.json();
    const yera=data.results;
    yera.forEach((item) => {
        const div=document.createElement('div');
        div.className="card";
        div.innerHTML=`
        <div class="card">
              <a href="tv-details.html?id=${item.id}">
              <img
              src="https://image.tmdb.org/t/p/w500${item.poster_path}?api_key=d24a69f94e1ee79c49275818f351ebef"
              
              class="card-img-top"
              alt="Movie Title"
              />
              </a>
              <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">
              <small class="text-muted">${item.release_date}</small>
              </p>
               </div>`;
        const gere=document.getElementById('search-results');
        gere.appendChild(div); 
      })
}

async function dodo(){
    const late=await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=d24a69f94e1ee79c49275818f351ebef&language=en-US')
    const {results}=await late.json();
    results.forEach((item) => {
      const div=document.createElement('div');
      div.classList.add('swiper-slide');
      div.innerHTML=`
            <a href="movie-details.html?id=${item.id}">
              <img src="https://image.tmdb.org/t/p/w500${item.poster_path}?api_key=d24a69f94e1ee79c49275818f351ebef" alt="Movie Title" />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${item.vote_average.toFixed(1)} / 10
            </h4>`;   
      const gere=document.querySelector('.swiper-wrapper');
      gere.appendChild(div);
    initSwiper();
  }) 
}
function initSwiper(){
  const swiper=new Swiper('.swiper',{
    slidesPerView:1,
    spaceBetween:30,
    freeMode: true,
    autoplay:{
      delay:4000,
      disableOnInteraction: false
    },
    breakpoints:{
      500:{
        slidesPerView:2
      },
      700:{
        slidesPerView:3
      },
      1200:{
        slidesPerView:4
      },
    }
  });
}


// Router
function init(){
    switch(global.currentPage){
        case'/':
        case'/index.html':
        displayPopularMovies();
        dodo();       
        break;

        case'/shows.html':        
        displayTVShows();
        break;

        case'/movie-details.html':
        displayMoviesDetails();
        break;

        case'/tv-details.html':
        displayTvDetails(golo.currentPage);
        break;

        case'/search.html':
        if(till==='tv'){
          displaySearchTv();
        }else{
          displaySearchMovies();
        }
        break;
      }  
}
document.addEventListener('DOMContentLoaded',init);