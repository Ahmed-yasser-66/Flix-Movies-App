const global = {
  currentPage: window.location.pathname,
};

//Display 20 popular shows
async function dispalyPopularmovies() {
  const { results } = await fetchAPIdata('movie/popular');
  console.log(results);
  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />`
                : `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${movie.title}"
          />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        `;

    document.getElementById('popular-movies').appendChild(div);
  });
}

//Display 20 popular TV shows
async function dispalyPopularShows() {
  const { results } = await fetchAPIdata('tv/popular');
  console.log(results);
  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
            <a href="tv-details.html?id=${show.id}">
              ${
                show.poster_path
                  ? `<img
                src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                class="card-img-top"
                alt="${show.name}"
              />`
                  : `<img
              src="../images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
              }
            </a>
            <div class="card-body">
              <h5 class="card-title">${show.name}</h5>
              <p class="card-text">
                <small class="text-muted">Release: ${
                  show.first_air_date
                }</small>
              </p>
            </div>
          `;

    document.getElementById('popular-shows').appendChild(div);
  });
}

// Display movie details
async function displayMovieDetails() {
  const movieId = window.location.search.split('=')[1];

  const movie = await fetchAPIdata(`movie/${movieId}`);

  console.log(movie);

  const div = document.createElement('div');
  div.innerHTML = `        
  <div class="details-top">
  <div>
    <img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="Movie Title"
    />
  </div>
  <div>
    <h2>${movie.title}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      8 / 10
    </p>
    <p class="text-muted">Release Date:${movie.release_date}</p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
      atque molestiae error debitis provident dolore hic odit, impedit
      sint, voluptatum consectetur assumenda expedita perferendis
      obcaecati veritatis voluptatibus. Voluptatum repellat suscipit,
      quae molestiae cupiditate modi libero dolorem commodi obcaecati!
      Ratione quia corporis recusandae delectus perspiciatis consequatur
      ipsam. Cumque omnis ad recusandae.
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
      <li>Genre 1</li>
      <li>Genre 2</li>
      <li>Genre 3</li>
    </ul>
    <a href="#" target="_blank" class="btn">Visit Movie Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Movie Info</h2>
  <ul>
    <li><span class="text-secondary">Budget:</span> $1,000,000</li>
    <li><span class="text-secondary">Revenue:</span> $2,000,000</li>
    <li><span class="text-secondary">Runtime:</span> 90 minutes</li>
    <li><span class="text-secondary">Status:</span> Released</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">Company 1, Company 2, Company 3</div>
</div>`;

  document.getElementById('movie-details').appendChild(div);
}

//Fetch Data From TMBD API
async function fetchAPIdata(endpoint) {
  const API_KEY = '96a65ecbd7d37df355ec6689666cae6f';
  const API_URL = 'https://api.themoviedb.org/3/';

  showSpinner();

  const respone = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await respone.json();

  hideSpinner();

  return data;
}

//Controling the spinner
function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
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
      dispalyPopularmovies();
      break;

    case '/shows.html':
      dispalyPopularShows();
      break;

    case '/movie-details.html':
      displayMovieDetails();
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
