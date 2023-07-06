const global = {
  currentPage: window.location.pathname,
};

async function dispalyPopularMovies() {
  const { results } = await fetchAPIdata('movie/popular');
  console.log(results);
  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    document.getElementById('popular-movies').appendChild(div);
  });
}

//Fetch Data From TMBD API
async function fetchAPIdata(endpoint) {
  const API_KEY = '96a65ecbd7d37df355ec6689666cae6f';
  const API_URL = 'https://api.themoviedb.org/3/';

  const respone = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await respone.json();

  return data;
}

//Highlight Active Link
function highLightActiveLink() {
  const links = document.querySelectorAll('.nav-link');

  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

//Init App
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      dispalyPopularMovies();
      break;

    case '/shows.html':
      console.log('This is shows page');
      break;

    case '/movie-details.html':
      console.log('This is movie-details page');
      break;

    case '/tv-details.html':
      console.log('This is tv-details page');
      break;

    case '/search.html':
      console.log('This is search page');
      break;
  }

  highLightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
