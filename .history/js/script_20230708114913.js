const global = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    api_key: '96a65ecbd7d37df355ec6689666cae6f',
    api_url: 'https://api.themoviedb.org/3/',
  },
};

//Display 20 popular shows
async function dispalyPopularmovies() {
  const { results } = await fetchAPIdata('movie/popular');
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

  displayBackgroundImage('movie', movie.backdrop_path);

  const div = document.createElement('div');
  div.innerHTML = `
  <div class="details-top">
  <div>
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
  </div>
  <div>
    <h2>${movie.title}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${movie.vote_average.toFixed(1)} / 10
    </p>
    <p class="text-muted">Release Date: ${movie.release_date}</p>
    <p>
      ${movie.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
      ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
    </ul>
    <a href="${
      movie.homepage
    }" target="_blank" class="btn">Visit Movie Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Movie Info</h2>
  <ul>
    <li><span class="text-secondary">Budget:</span> $${addCommas(
      movie.budget
    )}</li>
    <li><span class="text-secondary">Revenue:</span> $${addCommas(
      movie.revenue
    )}</li>
    <li><span class="text-secondary">Runtime:</span> ${
      movie.runtime
    } minutes</li>
    <li><span class="text-secondary">Status:</span> ${movie.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">
    ${movie.production_companies
      .map((company) => `<span>${company.name}</span>`)
      .join(', ')}
  </div>
</div>
  `;

  document.getElementById('movie-details').appendChild(div);
}

// Display Show details
async function displayShowDetails() {
  const ShowId = window.location.search.split('=')[1];

  const show = await fetchAPIdata(`tv/${ShowId}`);

  console.log(show);

  displayBackgroundImage('tv', show.backdrop_path);

  const div = document.createElement('div');
  div.innerHTML = `
    <div class="details-top">
    <div>
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
    </div>
    <div>
      <h2>${show.name}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${show.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Release Date: ${show.last_air_date}</p>
      <p>
        ${show.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="${
        show.homepage
      }" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Number Of Epsiodes :</span> ${
        show.number_of_episodes
      }</li>
      <li><span class="text-secondary">Lat Episode To Air:</span> ${
        show.last_episode_to_air.name
      }</li>
      <li><span class="text-secondary">Status:</span> ${show.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
      ${show.production_companies
        .map((company) => `<span>${company.name}</span>`)
        .join(', ')}
    </div>
  </div>
    `;

  document.getElementById('show-details').appendChild(div);
}

// Display BackDrop on details page
function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}

//Display search results
async function displaySearchResults(results) {
  results.forEach((result) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
          <a href="${global.search.type}-details.html?id=${result.id}">
            ${
              result.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${result.poster_path}"
              class="card-img-top"
              alt="${
                global.search.type === 'movie' ? result.title : result.name
              } "
            />`
                : `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${global.search.type === 'movie' ? result.title : result.name}"
          />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${
              global.search.type === 'movie' ? result.title : result.name
            }</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${
                global.search.type === 'movie'
                  ? result.release_date
                  : result.first_air_date
              }</small>
            </p>
          </div>
        `;

    document.querySelector('#search-results-heading').innerHTML = `<h2>
    ${results.length} of ${global.search.totalResults} Results for "${global.search.term}"
    </h2>`;

    document.getElementById('search-results').appendChild(div);

    displayPagination();
  });
}

//Create & Display Pagination
function displayPagination() {
  const div = document.createElement('div');
  div.classList.add('pagination');
  div.innerHTML = `
  <button class="btn btn-primary" id="prev">Prev</button>
  <button class="btn btn-primary" id="next">Next</button>
  <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
  `;

  document.querySelector('#pagination').appendChild(dispalyPopularShows);
}

//Display Movies Slider
async function displaySlider() {
  const { results } = await fetchAPIdata('movie/now_playing');

  console.log(results);

  results.forEach((result) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `
    <a href="movie-details.html?id=${result.id}">
    ${
      result.poster_path
        ? `<img src="https://image.tmdb.org/t/p/w500${result.poster_path}" alt="${result.title}" />`
        : `<img src="./images/no-image.jpg" alt="${result.title}" />`
    }
  </a>
  <h4 class="swiper-rating">
    <i class="fas fa-star text-secondary"></i> ${result.vote_average} / 10
  </h4>
    `;

    document.querySelector('.swiper-wrapper').appendChild(div);

    initSwiper();
  });
}

//Serch movies/shows
async function search() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');

  if (global.search.term !== '' && global.search.term !== null) {
    const { results, total_pages, page, total_results } = await searchAPIdata();

    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    if (results.length === 0) {
      showAlert('No results found');
      return;
    }

    displaySearchResults(results);
  } else {
    showAlert('Please Enter A Search Term', 'error');
  }
}

function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: true,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

//Fetch Data From TMBD API
async function fetchAPIdata(endpoint) {
  const API_KEY = global.api.api_key;
  const API_URL = global.api.api_url;

  showSpinner();

  const respone = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await respone.json();

  hideSpinner();

  return data;
}

//make request to search
async function searchAPIdata() {
  const API_KEY = global.api.api_key;
  const API_URL = global.api.api_url;

  showSpinner();

  const respone = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}`
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

// Show alert
function showAlert(message, className) {
  const alerEl = document.createElement('div');
  alerEl.classList.add('alert', className);
  alerEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alerEl);

  setTimeout(() => {
    alerEl.remove();
  }, 3000);
}

function addCommas(number) {
  return number.toLocaleString('en-US', { minimumFractionDigits: 0 });
}

//Init App
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displaySlider();
      dispalyPopularmovies();
      break;

    case '/shows.html':
      dispalyPopularShows();
      break;

    case '/movie-details.html':
      displayMovieDetails();
      break;

    case '/tv-details.html':
      displayShowDetails();
      break;

    case '/search.html':
      search();
      break;
  }

  highLightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
